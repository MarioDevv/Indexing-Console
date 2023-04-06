// Line Prompt Events
$("#output").on("change", function (e) {
  let actualTarget = e.target;
  if (e.target.nodeName === "INPUT") {
    $(actualTarget).on("keyup", async function (e) {
      if (e.keyCode === 13) {
        if ($(actualTarget).val().startsWith("ind ")) {
          $(actualTarget).attr("disabled", true);
          let urls = $(actualTarget).val();
          await indexURL(urls);
        }
        if (
          $(actualTarget).val() == "clear" ||
          $(actualTarget).val() == "cls"
        ) {
          clearPrompt();
        } else {
          $(actualTarget).attr("disabled", true);
          nextPrompt();
        }
      }
    });
  }
});

// Index URL Command
let indexURL = async (urls) => {
  const response = await fetch("http://localhost:3000/api/index", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: urls,
    }),
  });
  const jsonData = await response.json();

  jsonData.split("\n").forEach((line) => {
    createMessage(line);
  });
};

// Next Command Prompt
let nextPrompt = () => {
  let div = $('<div class="flex"></div>');
  let span = $('<span class="text-green-400">indexer:~$</span>');
  let input = $(
    '<input type="text" class="w-full pl-2 text-gray-100 bg-gray-800 outline-0">'
  );
  div.append(span);
  div.append(input);
  $("#output").append(div);
  $(input).trigger("focus");
};

// Create Message
let createMessage = (data) => {
  let div = $('<div class="flex text-sm"></div>');
  let input = $(
    '<input type="text" class="w-full pl-2 text-gray-100 bg-gray-800 outline-0">'
  );
  div.append(input);
  $("#output").append(div);
  $(input).val(data);
  $(input).attr("disabled", true);
};

// Clear Prompt Command
let clearPrompt = () => {
  $("#output").empty();
  nextPrompt();
};