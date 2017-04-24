// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
function ghost(isDeactivated) {
    options.style.color = isDeactivated ? 'graytext' : 'black';
    // The label color.
}
window.addEventListener('load', function () {
    // Initialize the option controls.
    options.isActivated.checked = JSON.parse(localStorage.isActivated);
    // The display activation.
    if (!options.isActivated.checked) { ghost(true); }
    // Set the display activation and category.
    options.isActivated.onchange = function () {
        localStorage.isActivated = options.isActivated.checked;
        ghost(!options.isActivated.checked);
    };
//    document.getElementById("commit").onclick = function () {
  //      if(document.getElementsByName('category')[0].getAttribute('checked'))
    //        localStorage.category = 'True';
      //  else
        //    localStorage.category = 'False';
   // };
});