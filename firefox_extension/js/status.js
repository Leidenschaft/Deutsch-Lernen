if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
   // localStorage.category = 'True';        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
}
function httpRequest(url, callback, suggest) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText, suggest);
            }
            else {
                console.log("error: status code " + xhr.status);
            }
        }
    }
    xhr.onerror = function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('textStatus: ' + textStatus);
        console.log('errorThrown ' + errorThrown);
        //callback(false, suggest);
    }
    xhr.send();
}

function update(xhr_response) {
    result_list = JSON.parse(xhr_response);
   // append_st = ''
   // for (var i = 0; i < result_list.length; i++) {
   //     append_st += '<tr><td>' + result_list[i].value + '</td><td>' + result_list[i].label + '</td></tr>'
   // }
    show(result_list[0].w, result_list[0].e);
   // document.getElementById('result').innerHTML = append_st;
}

my_notification = null;
function show(word, explanation) {
    if (browser.notifications.getAll()) {
        browser.notifications.clear("my_notification");
    }
    my_notification=browser.notifications.create("my_notification",{
        "type": "basic",
        "iconUrl": browser.extension.getURL('images/icon38.png'),
        "title": word,
        "message": explanation
    });
    //set time out to close the notification and shows a new one 
    //Notification.close()
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (
      JSON.parse(localStorage.isActivated)
    ) {
        url = 'http://leidenschaft.cn:8000/' + message;
        httpRequest(url, update);
    }
    //document.getElementById('word').value = '';
});
chrome.omnibox.setDefaultSuggestion({ 'description': 'Type german word and shows the chinese translation.' });

chrome.omnibox.onInputChanged.addListener(search_result);
function search_result(word, suggest) {
    url = 'http://leidenschaft.cn:8000/' + word;
    httpRequest(url, search_result_list,suggest);
}
function search_result_list(xhr_response, suggest) {
    result_list = JSON.parse(xhr_response);
    a = new Array();
    for (var i = 0; i < result_list.length; i++) {
        b = new Object();
        b['content'] = result_list[i].w;
        b['description'] = result_list[i].w+' : '+result_list[i].e;
        a.push(b)
    }
    suggest(a)
}