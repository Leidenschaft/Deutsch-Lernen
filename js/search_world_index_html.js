var jqueryFunction;
var getWord_form;
var search_result_list = [];
var search_mode = 'word_search';

function ChangeContent() {
    if (search_mode == 'word_search') {
        var newFileName = GetAddress();
            if (newFileName == null) {
                newFileName = '1.xml';
            }
            self.location = 'main_view.html?wordAddress=' + newFileName;
        
    }
    else {//example search, ajax request
        $.ajax({
            url: '../../corpus_service/example_search',
            type: 'GET',
            data:{
                queried_word:$("#searchField").val()
            },
            dataType: 'json',
            timeout: 1000,
            cache: false,
            error: function (xhr, status, errorThrown) {
                alert("status: " + status + "\n errorThrown " + errorThrown);
            },
            success: function (json_data) {
                var my_example_list = json_data.example_list;
                if (my_example_list) {
                    $("#resTree").html('');
                    self.parent.document.getElementById('word_example_view').setAttribute('rows', "50%,50%");
                    for (var i = 1; i <= my_example_list.length; i++) {
                        var one_item_head = $("<span/>", { 'html': i.toString() + ': ', 'style': 'color:red' });
                        var one_item = $("<p/>");
                        one_item.append(one_item_head);
                        one_item.append($("<span/>", { 'html': my_example_list[i - 1] }));
                        $("#resTree").append(one_item);
                    }
                }
                else {
                    alert("queried word not found in corpus.");
                }
            }
        });


    }
}
jqueryFunction = function SearchContent(possibleWord) {
    $("#searchField").val(possibleWord);
    return GetAddress();
}
function GetAddress() {
    var hasTheWord = 0;
    var wordform_queried = $("#searchField").val();
    for (var cnt = 0; cnt < dic.length;cnt++) {
        if (dic[cnt].wordform == wordform_queried) {
            hasTheWord = 1;
            break;
        }
    }
    if (hasTheWord == 1) {
        LastSearchedWord = wordform_queried;
        return dic[cnt].address;
    }
    else {
        return null;
    }
}
getWord_form = function get_word_form(wordAddr) {
    var hasTheWord = 0;
    for (var cnt = 0; cnt < dic.length; cnt++) {
        if (dic[cnt].address == wordAddr) {
            hasTheWord = 1;
            break;
        }
    }
    if (hasTheWord == 1) {
        return dic[cnt].wordform;
    }
    else {
        return null;
    }

}
$(document).ready(function () {
    $("button").click(function () {
            ChangeContent();
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
            if (keynum == 13)
                ChangeContent();
    });
});
