// Event shwn new input added 
$('#output').on('change', function (e) {
    let actualTarget = e.target;
    if (e.target.nodeName === 'INPUT') {
        $(actualTarget).on('keyup', function (e) {
            if (e.keyCode === 13) {

                if ($(actualTarget).val().includes('ind')) {
                    indexUrl($(actualTarget).val());
                }

                if ($(actualTarget).val() == 'clear' || $(actualTarget).val() == 'cls') {
                    clearPrompt();
                }
                else {
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


// Commands

let indexUrl = (value) => {

    let url = value.split('ind ')[1];
    
}

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



