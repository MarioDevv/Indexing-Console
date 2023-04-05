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

// Line Prompt Events 
$('#output').on('change', function (e) {
    let actualTarget = e.target;
    if (e.target.nodeName === 'INPUT') {
        $(actualTarget).on('keyup', function (e) {
            if (e.keyCode === 13) {
                if ($(actualTarget).val().startsWith('ind ')) {
                    IndexUrl($(actualTarget).val());
                } if ($(actualTarget).val() == 'clear' || $(actualTarget).val() == 'cls') {
                    clearPrompt();
                } else {
                    let div = $('<div class="flex"></div>');
                    let span = $('<span class="text-green-400">indexer:~$</span>');
                    let input = $('<input type="text" class="w-full pl-2 text-gray-100 bg-gray-800 outline-0">');
                    div.append(span);
                    div.append(input);
                    $('.flex').last().after(div);
                    $(actualTarget).attr('disabled', true);
                    $(input).trigger('focus');
                }
            }
        });
    }
});

