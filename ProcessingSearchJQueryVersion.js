var jqueryFunction;
$(document).ready(function () {
    //below the xml file wordlist is loaded
    var myDic = new Array();
    myDic['ab'] = 3;
    myDic['cd'] = 4;
    if ('ab' in myDic) {
        var a = 1;
    }

    var BrowersType;
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Android")>-1) {
        //page redirection
        location.href = "index_mobile.html";
    }
    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Firefox") > -1) {
        BrowersType = "Chrome";
    }
    else {
        BrowersType = "IE";

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
    function Wort(wordform, address) {
        this.wordform = wordform;
        this.address =address;
    }
    function sortWort(wort_1, wort_2) {//if wort_1<wort_2; return false
        var minLen = wort_1.wordform.length;
        if (minLen > wort_2.wordform.length) minLen = wort_2.wordform.length;
        var wort_2_is_forward=true;
        for(var i=0;i<minLen;i++){
            var first=GetCharCode(wort_1.wordform[i]);
            var next= GetCharCode(wort_2.wordform[i]);
            if (first<next) {
                wort_2_is_forward=false;
                break;
            }
            else if (first > next) {
                break;
            }
        }
        return wort_2_is_forward;
    }
    var dic = new Array();
    var xmlDoc_wordList;
    var xmlhttp = new XMLHttpRequest();
    function GetXML(xml) {
        xmlDoc_wordList = xml;
        $(xml).find("Word").each(function (i) {

            var id = $(this);
            dic.push(new Wort(id.text(), id.attr("address")));
        }
        )
        dic.sort(sortWort);
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

    if (BrowersType == "Chrome") {
        //change the WordList_11.xml to WordList_11.html
        if (!isIndexPage) {
            self.parent.frames["wordList"].location = "WordList_11.html";
        }
        $.ajax({
            url: 'Wordlist_11.xml',
            type: 'GET',
            dataType: 'xml',
            timeout: 1000,
            cache: false,
            error: function (xml) {
                //try loading xml with original javascript
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
    else {
        var srcTree = new ActiveXObject("Msxml2.DOMDocument.6.0");
        srcTree.async = false;
        srcTree.load('Wordlist_11.xml');
        var xmlObj = srcTree.documentElement.childNodes;
        for (j=0;j<xmlObj.length;j++){
            var entry = xmlObj.item(j);
            var attr = entry.attributes.item(0).value;
            //var jplus=j+1;//here getAttribute method should be used;
            dic.push(new Wort(entry.text,attr));
            
            dic[entry.text] = attr;//jplus.toString();	
        }//implementing the sorting by yourself
        for (var i = dic.length - 1; i > 0; i--)
            for (var j = 0; j < i; j++)
                if (sortWort(dic[j], dic[j + 1])) {
                    var k = dic[j];
                    dic[j] =dic[j+1];
                    dic[j + 1] = k;
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
        //alert("Location"+wordID);
        for (var cnt = 0; cnt < dic.length;cnt++) {
            if (dic[cnt].wordform == wordform_queried) {
                hasTheWord = 1;
                break;
            }
        }
        if (hasTheWord == 1) {
            LastSearchedWord = wordform_queried;
            //here call the scrollbar utility function
            if (!isIndexPage) {
                self.parent.frames["wordList"].document.getElementById(wordform_queried).focus();
                //element should be focused
            }
            return dic[cnt].address;
        }
        else {
            //local dictionary not found the word,search the external online dictionary
            //xmlhttp.open("GET", "gehen.txt", true);//data query realization.
            //xmlhttp.send();
            
            return null;
        }
    }
/*    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var textGet = xmlhttp.responseText;
            var JSONObject = eval("(" + textGet + ")");
            var info = JSONObject.query.pages[11187].revisions["0"]["*"];
        }
    }*/
    $("#searchField").on("focus", function () {
        if ($("#searchField").val()=='Please Type the word you want to search' || (LastSearchedWord != ''))
        { $("#searchField").val(''); }
    });

    $("#searchField").on("blur", function () {
        if ($("#searchField").val()== '') {
            if (LastSearchedWord != '')
                $("#searchField").val(LastSearchedWord);
            else
                $("#searchField").val('Please Type the word you want to search');
        }
    });
    $("#searchField").keypress(function (e) {
        //judge the focused element here 
  //      var triggerElement = document.activeElement;
    //    if (triggerElement.name == 'InputBox') {
            var keynum;
            keynum = e.keyCode;
            if (keynum == 13)
                ChangeContent();
//        }
    });

    $("#searchField").on('input', function () {

        var entry = $("#searchField").val();
        if(entry==''){
        $("#Words").html('');
        }
        else{
        addWordToList(entry);
   	  }
    });
    function GetCharCode(character) {
        unicode=character.charCodeAt(0);
        if (unicode > 122) {
            switch (unicode) {
                case 220:
                    unicode = 85;//U
                    break;
                case 0xFC:
                    unicode = 117;//u
                    break;
                case 0xC4:
                    unicode = 65;//A
                    break;
                case 0xE4:
                    unicode = 97;//a
                    break;
                case 0xD6:
                    unicode = 79;//O
                    break;
                case 0xF6:
                    unicode = 111;//o
                    break;
                case 0xDF:
                    unicode = 115;//ss
                    break;
                default:
                    break;
            }
        }
        if (unicode >= 65 && unicode <= 90) unicode = unicode + 32;
            return unicode;
    }
    function addWordToList(entry) {
            var htmlcontent = "";
            var c = 0;
            for(var j=0;j<dic.length;j++){//dic has been sorted!
                var minLen = dic[j].wordform.length;
                if (minLen > entry.length) minLen = entry.length;
                var isContinued=false;
                for(var i=0;i<minLen;i++){
                    if (GetCharCode(dic[j].wordform[i]) < GetCharCode(entry[i])) {
                        isContinued = true;
                        break;
                    }
                }
                if (isContinued) continue;
  //              if (x < entry) {
  //                  continue;
  //              }
                htmlcontent = htmlcontent + "<option value=\"" + dic[j].wordform + "\"></option>";
                c = c + 1;
                if (c == 5) {
                    break;
                }
            }
            $("#Words").html(htmlcontent);
        }
});
