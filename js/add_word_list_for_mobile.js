$(document).ready(function () {
    $.ajax({
        url: 'Wort/wordlist.xml',
        type: 'GET',
        dataType: 'xml',
        timeout: 1000,
        error: function (xml) {//try loading xml with original javascript       
                alert("loading xml encounters an error!");
        },
        success: function (xml) {
            var word_list = $(xml).find("Wordlist").children("*");
            for (var i = 0; i < word_list.length; i++) {
                var item_new = $("<a/>", {
                    "href": "main_view_mobile.html?wordAdress=" + word_list.eq(i).attr("address"),
                    "html": word_list.eq(i).text(),
                    "class":"ui-btn ui-btn-icon-right ui-icon-carat-r"
                });
                var item_li = $("<li/>", {"class":"ui-screen-hidden"});
                item_new.appendTo(item_li);
                $("#index_listview").append(item_li);
            }
        }
    });
    var isIndexPage=true;
    if ($("#entry_container").length) {
        isIndexPage = false;
        url = this.location.search;
        if (url != "") {
            var newFileName = url.match("=(.*)");
             $("#entry_container").attr("src",'Wort/' + newFileName[1]);
        }
    }
    if (!isIndexPage) {
        var url = this.location.search;
        $("#index_listview").bind("tap", function (event) {
            var content = $(event.target).attr("href");
            var newFileName = content.match("=(.*)");
            $("#entry_container").attr("src", 'Wort/' + newFileName[1]);
            $("#index_listview").children("*").attr("class", "ui-screen-hidden");
            return false;
        });
    }
/*    else {
        $("#index_listview").bind("tap", function (event) {
            var content = $(event.target).attr("href");
            this.location = content;
        });

    }*/
    
});