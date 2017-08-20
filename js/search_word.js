var jqueryFunction;
var getWord_form;
var search_result_list=[];
$(document).ready(function () {
    
    
    var search_mode = 'word_search';
    var url = self.parent.getURL();
        if (url !="") {
            var newFileName = url.match("=(.*)");
            if (newFileName.length < 1) {
                self.parent.frames["right_frame"].location = 'Wort/V100.xml';
            }
            else
                self.parent.frames["right_frame"].location = 'Wort/' + newFileName[1];
        }
    
  
    
    $("#test_button").click(function () {
        if (this.innerHTML == 'Test your vocabulary') {//open Test interface
            this.innerHTML = '关闭测试界面'
            self.parent.frames["editing_frame"].location = "client_form/test_interface_config.html";
            self.parent.change_editing_frame("editing");

        }
        else {
            self.parent.frames["editing_frame"].location = 'client_form/editing_interface.html';
            self.parent.change_editing_frame("viewing");
            this.innerHTML = 'Test your vocabulary';
        }
    });
 
    var LastSearchedWord = '';
    $("button").click(function () {
            ChangeContent();
    });
    function ChangeContent() {
        if (search_mode == 'word_search') {
            var newFileName = GetAddress();
            if (newFileName) {
             //   self.parent.frames["right_frame"].location = 'Wort/' + newFileName;
                search_result_list=[]
                search_result_list.push({'href':'Wort/' + newFileName,'desc':$("#searchField").val()});
                self.parent.frames["right_frame"].location = "search_result.html";
                var st = $("#searchField");//prepend # select id.
                st.focus();
                st.select();
            }
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
                self.parent.frames["wordList"].document.getElementById(wordform_queried).focus();
                //element should be focused
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
