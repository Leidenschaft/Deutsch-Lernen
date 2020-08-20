"use strict";
var $;
var self, alert;
var lessThan, bisection;
var language, dic, availableTags;
var jqueryFunction;
var getWord_form;
var search_result_list = [];
var search_mode = 'word_search';
function getAddress() {
    var wordform_queried = $("#searchField").val(),
        hasTheWord = 0,
        pos;
    if (wordform_queried.length === 0) {
        return false;
    }
    pos = bisection(dic, wordform_queried,
        function (wordStr, wort) {
            return lessThan(wordStr, wort.wordform);
        });

    if (dic[pos - 1].wordform === wordform_queried) {
        hasTheWord = 1;
    }
    if (hasTheWord === 1) {
        self.parent.frames.wordList.document.getElementById(wordform_queried).focus();
        // element should be focused
        return dic[pos - 1].address;
    }
    return null;
}
function changeContent() {
    if (search_mode === 'word_search') {
        var newFileName = getAddress(),
            st;
        if (newFileName) {
            search_result_list = [];
            search_result_list.push({'href' : 'Wort/' + language + '/' + newFileName,
                                    'desc' : $("#searchField").val()});
            self.parent.frames.right_frame.location = "search_result.html";
            st = $("#searchField"); // prepend # select id.
            st.focus();
            st.select();
        }
    } else if (search_mode === 'example_search') {
        // example search, ajax request
        $.ajax({
            url: '../../corpus_service/example_search',
            type: 'GET',
            data: {
                queried_word: $("#searchField").val()
            },
            dataType: 'json',
            timeout: 1000,
            cache: false,
            error: function (xhr, status, errorThrown) {
                /*jslint unparam: true*/
                alert("status: " + status + "\n errorThrown " + errorThrown);
            },
            success: function (json_data) {
                var my_example_list = json_data.example_list,
                    i,
                    one_item_head,
                    one_item;
                if (my_example_list) {
                    $("#resTree").html('');
                    self.parent.document.getElementById('word_example_view').setAttribute('rows', "50%,50%");
                    for (i = 1; i <= my_example_list.length; i += 1) {
                        one_item_head = $("<span/>", { 'html': i.toString() + ': ', 'style': 'color:red' });
                        one_item = $("<p/>");
                        one_item.append(one_item_head);
                        one_item.append($("<span/>", { 'html': my_example_list[i - 1] }));
                        $("#resTree").append(one_item);
                    }
                } else {
                    alert("queried word not found in corpus.");
                }
            }
        });
    }
}

getWord_form = function get_word_form(wordAddr) {
    var hasTheWord = 0,
        cnt;
    for (cnt = 0; cnt < dic.length; cnt += 1) {
        if (dic[cnt].address === wordAddr) {
            hasTheWord = 1;
            break;
        }
    }
    if (hasTheWord === 1) {
        return dic[cnt].wordform;
    }
    return null;
};

jqueryFunction = function SearchContent(possibleWord) {
    $("#searchField").val(possibleWord);
    return getAddress();
};

$(document).ready(function () {
    var url = self.parent.getURL(),
        newFileName;
    self.parent.parent.frames.wordList.location = 'Wort/' + language + '/wordlist.xml';
    if (url !== "") {
        newFileName = url.match("=(.*)");
        if (newFileName.length < 1) {
            self.parent.frames.right_frame.location = 'Wort/1.xml';
        } else {
            self.parent.frames.right_frame.location = 'Wort/' + language + '/' + newFileName[1];
        }
    }
    $("button").click(function () {
        changeContent();
    });
    $("#searchField").autocomplete({
        source: availableTags
    });
    $("#example_search").on('click', function () {
        search_mode = 'example_search';
        $("#searchField").autocomplete("destroy");
    });
    $("#word_search").on('click', function () {
        search_mode = 'word_search';
        self.parent.document.getElementById('word_example_view').setAttribute('rows', "10%,90%");
        $("#searchField").autocomplete({ source: availableTags });
    });
    $("#searchField").keypress(function (e) {
        var keynum;
        keynum = e.keyCode;
        if (keynum === 13) {
            changeContent();
        }
    });
});
