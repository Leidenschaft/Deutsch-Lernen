var jqueryFunction;
$(document).ready(function () {
    //below the xml file wordlist is loaded
    var BrowerType;
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Firefox") > -1) {
        BrowerType = "Chrome";
    }
    else {
        BrowerType = "IE";

    }
    var isIndexPage;
    if ($("#Centering").length) {
        isIndexPage = true;
    }
    else {
        isIndexPage = false;
        var url = self.parent.getURL();
        if (url != null) {
            var newFileName = url.match("=(.*)");
            self.parent.frames["right_frame"].location = 'Wort/' + newFileName[1];
        }
    }
    var dic = new Array();
    var xmlDoc_wordList;
    if (BrowerType == "Chrome") {
        $.ajax({
            url: 'Wordlist_11.xml',
            type: 'GET',
            dataType: 'xml',
            timeout: 1000,
            cache: false,
            error: function (xml) {
                alert("loading xml encounters an error!");
            },
            success: function (xml) {
                xmlDoc_wordList = xml;
                $(xml).find("Word").each(function (i) {
                    var id = $(this);
                    var entry = id.text();
                    var attr = id.attr("address");
                    dic[entry] = attr;//jplus.toString();	
                }
        )
            }
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
            dic[entry.text] = attr;//jplus.toString();	
        }
    }

    var LastSearchedWord = '';
    $("button").click(function (){
            ChangeContent();
    });
    function ChangeContent() {
        var newFileName = GetAddress();
        if (isIndexPage) {
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
        var wordform = $("#searchField").val();
        var cnt=0;
        //alert("Location"+wordID);
        for (x in dic) {
        	  cnt=cnt+1;
            if (x == wordform) {
                hasTheWord = 1;
                break;
            }
        }
        if (hasTheWord == 1) {
            LastSearchedWord = wordform;
            //here call the scrollbar utility function
            if (!isIndexPage) {
                self.parent.frames["wordList"].scrollFunction(cnt);
            }
            return dic[wordform];
        }
        else
            return null;
    }
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


        var keynum;
            keynum = e.keyCode;
            if (keynum == 13)
                ChangeContent();
    });

     /*   var htmlcontent = "";
        for (x in dic) {
            htmlcontent = htmlcontent + "<option value=\"" + x + "\"></option>";
        }
        $("#Words").html(htmlcontent);
    */
    $("#searchField").on('input', function () {
        var entry = $("#searchField").val();
        if(entry==''){
        $("#Words").html('');
        }
        else{
        addWordToList(entry);
   	  }
    });

        function addWordToList(entry) {
            var htmlcontent = "";
            var c = 0;
            for (x in dic) {
                if (x < entry) {
                    continue;
                }
                htmlcontent = htmlcontent + "<option value=\"" + x + "\"></option>";
                c = c + 1;
                if (c == 5) {
                    break;
                }
            }
            $("#Words").html(htmlcontent);
        }

});
