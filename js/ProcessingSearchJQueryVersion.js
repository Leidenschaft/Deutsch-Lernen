var jqueryFunction;
var getWord_form;
$(document).ready(function () {
    var BrowsersType;
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Android")>-1  || userAgent.indexOf("iPhone")>-1 ) {
        location.href = "FrameSetTest_for_mobile.html";
    }
    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Firefox") > -1) {
        BrowsersType = "Chrome";
    }
    else {
        BrowsersType = "IE";

    }
    var isIndexPage;
    var search_mode = 'word_search';
    if ($("#Centering").length) {
        isIndexPage = true;
    }
    else {
        isIndexPage = false;
        var url = self.parent.getURL();
        if (url !="") {
            var newFileName = url.match("=(.*)");
            if (newFileName.length < 1) {
                self.parent.frames["right_frame"].location = 'Wort/V100.xml';
            }
            else
                self.parent.frames["right_frame"].location = 'Wort/' + newFileName[1];
        }
    }
    function Wort(wordform, address,other_info) {
        this.wordform = wordform;
        this.address = address;
    }
    var dic = new Array();
    var availableTags = new Array();
    var xmlDoc_wordList;
    var xmlhttp = new XMLHttpRequest();
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
    function GetXML(xml) {
        xmlDoc_wordList = xml;
        $(xml).find("Word").each(function (i) {

            var id = $(this);
            var other_info;
            var oneDicEntry = new Array();
            oneDicEntry['value'] = id.text();
            if (id.attr("address")[0] == 'V')
                oneDicEntry['label']=id.text()+' '+id.attr("third_person_present") + '|' + id.attr("perfekt") + ' ' + id.attr('chinese');
            else 
                oneDicEntry['label'] =id.text() + ' ' + id.attr("gender") + ' ' + id.attr('chinese');

            dic.push(new Wort(id.text(), id.attr("address"), other_info));
            availableTags.push(oneDicEntry);
        }
        )
    }
    function GetXML2() {

        if (xmlhttp.readyState == 4) {// 4 = "loaded"
            if (xmlhttp.status == 200) {// 200 = "OK"
                GetXML(xmlhttp.responseText);
            }
            else {
                alert("Problem retrieving XML data:" + xmlhttp.statusText);
            }
        }
    }
    if (BrowsersType == "Chrome") {
        $.ajax({
            url: 'Wordlist_11.xml',
            type: 'GET',
            dataType: 'xml',
            timeout: 1000,
            cache: false,
            error: function (xml) {//try loading xml with original javascript
                if (xmlhttp != null) {
                    xmlhttp.onreadystatechange = GetXML_2;
                    xmlhttp.open("GET", '/Wordlist_11.xml', true);
                    xmlhttp.send(null);
                }
                else {
                    alert("loading xml encounters an error!");
                }
            },
            success: GetXML
        });
    }
    else {//for IE,this feature is for opening Frameset without configuring the server
        var srcTree = new ActiveXObject("Msxml2.DOMDocument.6.0");
        srcTree.async = false;
        srcTree.load('Wordlist_11.xml');
        var xmlObj = srcTree.documentElement.childNodes;
        for (j=0;j<xmlObj.length;j++){
            var entry = xmlObj.item(j);
            var attr = entry.attributes.item(0).value;
            dic.push(new Wort(entry.text,attr));
            
            dic[entry.text] = attr;	
        }
    }

    var LastSearchedWord = '';
    $("button").click(function () {
            ChangeContent();
    });
    function ChangeContent() {
        if (search_mode == 'word_search') {
            var newFileName = GetAddress();
            if (isIndexPage) {
                if (newFileName == null) {
                    newFileName = 'V100.xml';
                }
                self.location = 'FrameSetTest.html?wordAddress=' + newFileName;
            }
            else if (newFileName) {
                self.parent.frames["right_frame"].location = 'Wort/' + newFileName;

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
            if (!isIndexPage) {
                self.parent.frames["wordList"].document.getElementById(wordform_queried).focus();
                //element should be focused
            }
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
