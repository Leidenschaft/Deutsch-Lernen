const alphabet="AÄaäBbCcDdEeFfGgHhIiJjKkLlMmNnOÖoöPpQqRrSsßTtUÜuüVvWwXxYyZz"
function lessThan(firstStr,secondStr){
    var indicator=comparator(firstStr, secondStr);
    return indicator==-1
}
function greaterThan(firstStr,secondStr){
    var indicator=comparator(firstStr, secondStr);
    return indicator==1
}
function lessThanOrEqual(firstStr,secondStr){
    var indicator=comparator(firstStr, secondStr);
    return indicator<1
}
function greaterThanOrEqual(firstStr,secondStr){
    var indicator=comparator(firstStr, secondStr);
    return indicator>-1
}

function comparator(firstStr, secondStr) {
        if(firstStr==secondStr) return 0;
      // get the length of longest string
      const maxStrLength = Math.max(firstStr.length, secondStr.length);

      // loop through characters
      for (var charIndex = 0; charIndex < maxStrLength; charIndex++) {
        var firstChar, secondChar, firstCharPos, secondCharPos;

        firstChar = firstStr[charIndex];
        secondChar = secondStr[charIndex];

        // if characters in compared strings equal --> continue for next
        if (firstChar === secondChar) {
          continue;
        }

        // get index of characters in given alphabet for both strings
        firstCharPos = alphabet.indexOf(firstChar);
        secondCharPos = alphabet.indexOf(secondChar);


        if (firstCharPos === -1) {
          // if first string is finished don't swap
          return -1
        }
        if (secondCharPos === -1) {
          // if second string is finished swap them
          return 1
        }

        // is character in first string has bigger index than in second string --> swap them
        // otherwise don't swap
        return firstCharPos > secondCharPos ? 1 : -1
      }
}