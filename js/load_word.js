"use strict";

var $;
var alert;
var lessThan, bisection, language;
var dic = [];

function Wort(wordform, address) {
    this.wordform = wordform;
    this.address = address;
}
function Lemma(wordform, entry) {
    this.wordform = wordform;
    this.entry = entry;
}
function WortLessThan(wort1, wort2) {
    return lessThan(wort1.wordform, wort2.wordform);
}

var availableTags = [];
$(document).ready(function () {
    // ajax request for word list
    function GetXML(xml) {
        $(xml).find("Word").each(function () {
            var id = $(this),
                oneDicEntry = [],
                newWort = new Wort(id.text(), id.attr("address"));
            oneDicEntry.value = id.text();
            if (id.attr("address")[0] === "V") {
                oneDicEntry.label = id.text() + " "
                    + id.attr("third_person_present") + "|"
                    + id.attr("perfekt") + " " + id.attr('chinese');
            } else {
                oneDicEntry.label = id.text() + " "
                        + id.attr("gender") + " " + id.attr('chinese');
            }
            dic.splice(bisection(dic, newWort, WortLessThan), 0, newWort);
            availableTags.push(oneDicEntry);
        });
    }

    $.ajax({
        url: 'Wort/' + language + '/wordlist.xml',
        type: 'GET',
        dataType: 'xml',
        timeout: 1000,
        cache: false,
        error: function () {
            alert("loading xml encounters an error!");
        },
        success: GetXML
    });
});