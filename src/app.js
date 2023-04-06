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
          return;
        }
        if ($(actualTarget).val() == "whoami") {
          whoami();
        }
        if ($(actualTarget).val() == "upload") {
          uploadCredentials();
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
      key: JSON.parse(localStorage.getItem("credentials")),
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

// whoami Command
let whoami = () => {
  let div = $("<div></div>");
  let text =
    $(`<p class="text-gray-100">Hi, I'm a simple indexer made with NodeJS</p>
    <p>Joking, my name is <span class="text-green-400">Mario</span></p>
    <p>And I'm a <span class="text-green-400">Full Stack Web App Developer</span> and a PhpLover</p>
    <p>Check if its true :) --> <a href="https://github.com/PhPloveerPhP">https://github.com/PhPloveerPhP</a></p>`);

  div.append(text);
  $("#output").append(div);
};

// PopOver Hover Event
$("#info").on("click", function (e) {
  let lastInput = $("#output input").last();
  $(lastInput).val("Hello, lets help you my boy :)");
  $(lastInput).attr("disabled", true);
  let info = $("<div></div>");
  let tittle = $(
    '<h1 class="text-gray-100"> --------- Commands --------- </h1>'
  );
  let text = $(
    `<p class="text-gray-100">ind [url] - Index a URL</p>
      <p class="text-gray-100">cls/clear - Clear the terminal</p>
      <p class="text-gray-100">upload - Upload Google credentials file</p>
      <p class="text-gray-100">whoami - Its me :O!</p>
      <h1 class="text-gray-100"> --------- Commands --------- </h1>`
  );
  info.append(tittle);
  info.append(text);
  $("#output").append(info);
  nextPrompt();
});

// Upload Credentials command
let uploadCredentials = () => {
  let div = $("<div></div>");
  let text = $(
    `<p class="text-gray-100">Please, upload your credentials.json file</p>
    <input  type="file" id="file" name="file" accept=".json">`
  );
  div.append(text);
  $("#output").append(div);
  nextPrompt();
};

// After Upload Credentials disable the input
$("#output").on("change", "#file", function (e) {
  let actualTarget = e.target;
  $(actualTarget).attr("disabled", true);
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    let credentials = JSON.parse(reader.result);
    localStorage.setItem("credentials", JSON.stringify(credentials));
  };
});
