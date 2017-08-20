    function Wort(wordform, address,other_info) {
        this.wordform = wordform;
        this.address = address;
    }
    function Lemma(wordform,entry){
        this.wordform=wordform;
        this.entry=entry;
    }
    function WortLessThan(wort1,wort2){return lessThan(wort1.wordform,wort2.wordform);}
    var dic = new Array();
    var availableTags = new Array();
$(document).ready(function () {//ajax request for word list(firefox and chrome) or open it directly (ie)
    var xmlDoc_wordList;
    var xmlhttp = new XMLHttpRequest();
    var BrowsersType=detectBrowser(navigator.userAgent).name;
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
            newWort=new Wort(id.text(), id.attr("address"), other_info);
            dic.splice(bisection(dic,newWort,WortLessThan),0,newWort);

            //dic.push(new Wort(id.text(), id.attr("address"), other_info));
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
    if (true) {//BrowsersType == "chrome" || BrowsersType == "firefox"
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


});