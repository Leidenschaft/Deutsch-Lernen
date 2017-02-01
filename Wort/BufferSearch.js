var GetSelection;
$(document).ready(function () {
    //judge the browser type here
    var BrowersType;
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Firefox") > -1) {
        BrowersType = "Chrome";
    }
    else {
        BrowersType = "IE";
    }

    $("#audioImg").on("click", function () {
        //from <h1> to get the wordform
        var wordform = $("#stich_wort").html();
        var audio_path = "../audio/" + wordform + ".mp3";
        if (BrowersType == "IE") {
            if ($("#BGSOUND").length) {
                $("#BGSOUND").attr("src", audio_path);
            }
        }
        else {//Chrome Processing here
            var file = []; 
            file['mp3'] = audio_path; 
            audioplayer('audioplane', file, true); // 播放
        /*    var audioplayer = $("#ChromeAudio"); 
            if(audioplayer.length){//remove the original audio object
                audioplayer.remove();
            }
            var new_audioplayer=$("<audio></audio>");
            new_audioplayer.appendTo("#AudioDiv");
            new_audioplayer.id="ChromeAudio";
            new_audioplayer.attr("autoplay","autoplay");
            var new_source=$("<source></source>");
            new_source.src=audio_path;
            new_source.type="audio/mpeg";
            new_audioplayer.append(new_source);*/

        }
    });
    $("#edit_btn").on("click", function () {
        if (this.innerHTML == '编辑') {
            if ($("form").length < 1) {//reload editting_interface
                self.parent.frames["editing_frame"].location = 'client_form/editing_interface.html';
            }
            self.parent.frames["editing_frame"].load_xml(BrowersType);
            self.parent.change_editing_frame("editting");
            this.innerHTML = '取消编辑';
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
             //   if (loop) {
             //       player.setAttribute('loop', 'loop');
             //   }
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
function BufferSearch()
{
	var possibleWord=window.clipboardData.getData('text');
	if(possibleWord.split(" ").length==1){	//No space is contained, other limitation.
		var word_send=possibleWord.split(" ")[0];
	    LoadNewWord(word_send);
	}
	else
		alert("Invalid Word");
}
GetSelection=function GetSelection(){
	if(window.getSelection){
	  var selectedText = window.getSelection().toString(); 
	  if(selectedText!=null){
	     LoadNewWord(selectedText);
	  }
	   // self.parent.frames["left_frame"].document.getElementById("source").value=selectedText;	
}
}
});
