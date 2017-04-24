var last_modified = '';
window.onmouseup = function () {
    var selection = window.getSelection();
    if (selection.anchorOffset != selection.extentOffset && selection.toString().length<20 && selection.toString()!=last_modified) {
        last_modified = selection.toString();
        chrome.runtime.sendMessage(selection.toString())
    }
}