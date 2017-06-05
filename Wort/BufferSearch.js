var GetSelection;
$(document).ready(function () {
    var BrowsersType;    //judge the browser type here
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Android") > -1 || userAgent.indexOf("iPhone") > -1) {
        BrowserType = "Mobile";
    }
    else if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Firefox") > -1) {
        BrowsersType = "Chrome";
    }
    else {
        BrowsersType = "IE";
    }
    var url_current = this.location.pathname;
    if (url_current.indexOf("static") > 0) {//hide edit button
        $("#edit_btn").removeAttr("hidden");
    }
    //add support for mobile here
    $("#audioImg").on("click", function () {
        var wordform = $("#stich_wort").html();        //from <h1> to get the wordform
        var audio_path = "../audio/" + wordform + ".mp3";
        if (BrowsersType == "IE") {
            if ($("#BGSOUND").length) {
                $("#BGSOUND").attr("src", audio_path);
            }
        }
        else {//Chrome Processing here
            var file = []; 
            file['mp3'] = audio_path; 
            audioplayer('audioplane', file, true); // 播放
        }
    });
    $("#edit_btn").on("click", function () {
        if (this.innerHTML == '编辑') {
            if (self.parent.frames["editing_frame"].document.getElementById('tab_nav_1') == null) {//reload editting_interface
                self.parent.frames["editing_frame"].location = '../../Word_edit/create_new_word';
            }
            else {
                self.parent.frames["editing_frame"].load_xml(BrowsersType);
                self.parent.change_editing_frame("editing");
                this.innerHTML = '取消编辑';
            }
        }
        else {
            self.parent.change_editing_frame("viewing");
            this.innerHTML = '编辑';
        }
    });
    function audioplayer(id, file, loop) {
        var audioplayer = document.getElementById(id);
        if (audioplayer != null) {
            document.body.removeChild(audioplayer);
        }

        if (typeof (file) != 'undefined') {
           
                var player = document.createElement('audio');
                player.id = id;
                player.setAttribute('autoplay', 'autoplay');
                document.body.appendChild(player);
                var mp3 = document.createElement('source');
                mp3.src = file['mp3'];
                mp3.type = 'audio/mpeg';
                player.appendChild(mp3);           
        }
    }
function LoadNewWord(word_send) {
	var word_send_after_replace=word_send.replace(" ","");
	var newFileName = self.parent.frames["navigation"].jqueryFunction(word_send_after_replace);
	    if(newFileName)
	       window.location=newFileName;
}
GetSelection=function GetSelection(){
	if(window.getSelection){
	  var selectedText = window.getSelection().toString(); 
	  if(selectedText!=null){
	     LoadNewWord(selectedText);
	  }
}
}
});
