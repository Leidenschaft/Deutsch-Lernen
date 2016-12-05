function LoadNewWord(word_send){
	var word_send_after_replace=word_send.replace(" ","");
	var newFileName=self.parent.frames["navigation"].SearchContent(word_send_after_replace);
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
function GetSelection(){
	if(window.getSelection){
	  var selectedText = window.getSelection().toString(); 
	  if(selectedText!=null){
	     LoadNewWord(selectedText);
	  }
	   // self.parent.frames["left_frame"].document.getElementById("source").value=selectedText;	
}
}
		