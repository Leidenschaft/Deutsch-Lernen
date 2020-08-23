"use strict";

var alphabet = "AÄaäBbCcDdEeFfGgHhIiJjKkLlMmNnOÖoöPpQqRrSsßTtUÜuüVvWwXxYyZz";

function comparator(firstStr, secondStr) {
    var maxStrLength, charIndex,
        firstChar, secondChar, firstCharPos, secondCharPos;
    if (firstStr === secondStr) {
        return 0;
    }
    // get the length of longest string
    maxStrLength = Math.max(firstStr.length, secondStr.length);

    // loop through characters
    for (charIndex = 0; charIndex < maxStrLength; charIndex += 1) {
        firstChar = firstStr[charIndex];
        secondChar = secondStr[charIndex];

        // if characters in compared strings equal --> continue for next
        if (firstChar !== secondChar) {
            // get index of characters in given alphabet for both strings
            firstCharPos = alphabet.indexOf(firstChar);
            secondCharPos = alphabet.indexOf(secondChar);
            if (firstCharPos === -1) {
                // if first string is finished don't swap
                return -1;
            }
            if (secondCharPos === -1) {
                // if second string is finished swap them
                return 1;
            }

            // is character in first string has bigger index than in second string --> swap them
            // otherwise don't swap
            if (firstCharPos > secondCharPos) {
                return 1;
            }
            return -1;
        }
    }
}

function lessThan(firstStr, secondStr) {
    var indicator = comparator(firstStr, secondStr);
    return indicator === -1;
}

function greaterThan(firstStr, secondStr) {
    var indicator = comparator(firstStr, secondStr);
    return indicator === 1;
}

function lessThanOrEqual(firstStr, secondStr) {
    var indicator = comparator(firstStr, secondStr);
    return indicator < 1;
}

function greaterThanOrEqual(firstStr, secondStr) {
    var indicator = comparator(firstStr, secondStr);
    return indicator > -1;
}

