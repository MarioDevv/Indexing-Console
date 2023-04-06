// Clear Prompt Command
let clearPrompt = () => {
    $('#output').empty();
    let div = $('<div class="flex"></div>');
    let span = $('<span class="text-green-400">indexer:~$</span>');
    let input = $('<input type="text" class="w-full pl-2 text-gray-100 bg-gray-800 outline-0">');
    div.append(span);
    div.append(input);
    $('#output').append(div);
    $(input).trigger('focus');
}

let indexURL = async () => {
    const response = await fetch("http://localhost:3000/api/index");
    const jsonData = await response.json();

    jsonData.split("\n").forEach((line) => {
        let div = $('<div class="flex text-sm"></div>');
        let input = $('<input type="text" class="w-full pl-2 text-gray-100 bg-gray-800 outline-0">');
        div.append(input);
        $('#output').append(div);
        $(input).val(line);
        $(input).attr('disabled', true);
    });
}


// Line Prompt Events
$("#output").on("change", function (e) {
    let actualTarget = e.target;
    if (e.target.nodeName === "INPUT") {
        $(actualTarget).on("keyup", async function (e) {
            if (e.keyCode === 13) {
                if ($(actualTarget).val().startsWith("ind ")) {
                    await indexURL();
                }
                if (
                    $(actualTarget).val() == "clear" ||
                    $(actualTarget).val() == "cls"
                ) {
                    clearPrompt();
                } else {
                    let div = $('<div class="flex"></div>');
                    let span = $('<span class="text-green-400">indexer:~$</span>');
                    let input = $(
                        '<input type="text" class="w-full pl-2 text-gray-100 bg-gray-800 outline-0">'
                    );
                    div.append(span);
                    div.append(input);
                    $(".flex").last().after(div);
                    $(actualTarget).attr("disabled", true);
                    $(input).trigger("focus");
                }
            }
        });
    }
});


