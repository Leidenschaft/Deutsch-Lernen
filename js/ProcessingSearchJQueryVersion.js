var jqueryFunction;
var getWord_form;
$(document).ready(function () {
    var BrowsersType;
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Android")>-1  || userAgent.indexOf("iPhone")>-1 ) {
        location.href = "FrameSetTest.html";
    }
    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Firefox") > -1) {
        BrowsersType = "Chrome";
    }
    else {
        BrowsersType = "IE";

    }
    var isIndexPage;
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
        var newFileName = GetAddress();
        if (isIndexPage) {
            if (newFileName == null) {
                newFileName = 'V100.xml';
            }
            self.location = 'FrameSetTest.html?wordAddress='+newFileName;
        }
        else if (newFileName) {
            self.parent.frames["right_frame"].location = 'Wort/' + newFileName;
          
            var st = $("#searchField");//prepend # select id.
            st.focus();
            st.select();
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

    $("#searchField").keypress(function (e) {
            var keynum;
            keynum = e.keyCode;
            if (keynum == 13)
                ChangeContent();
    });
});
