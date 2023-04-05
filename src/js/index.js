
// Index URL Command
let indexUrl = (value) => {
    value = value.replace(/\s/g, ',');
    let url = value.split(',');
    url.shift();
    console.log(url);


    // var request = require('request');
    // var { google } = require('googleapis');
    // var key = require('./service_account.json');

    // fs.appendFile('urls.txt', '\nhttps://www.example.com/', function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
    // const jwtClient = new google.auth.JWT(
    //     key.client_email,
    //     null,
    //     key.private_key,
    //     ['https://www.googleapis.com/auth/indexing'],
    //     null
    // );

    // const batch = fs
    //     .readFileSync('urls.txt')
    //     .toString()
    //     .split('\n');

    // jwtClient.authorize(function (err, tokens) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     const items = batch.map(line => {
    //         return {
    //             'Content-Type': 'application/http',
    //             'Content-ID': '',
    //             body:
    //                 'POST /v3/urlNotifications:publish HTTP/1.1\n' +
    //                 'Content-Type: application/json\n\n' +
    //                 JSON.stringify({
    //                     url: line,
    //                     type: 'URL_UPDATED'
    //                 })
    //         };
    //     });
    //     const options = {
    //         url: 'https://indexing.googleapis.com/batch',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/mixed'
    //         },
    //         auth: { bearer: tokens.access_token },
    //         multipart: items
    //     };
    //     request(options, (err, resp, body) => {
    //         console.log(body);
    //     });
    // });

}

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



