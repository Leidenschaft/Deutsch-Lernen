		function SearchContent(possibleWord){
		document.getElementById("searchField").value=possibleWord;
		return GetAddress();
		}
		function GetAddress(){
				var hasTheWord=0;
			var inputField=document.getElementById("searchField");
			var wordID=inputField.value;
			//alert("Location"+wordID);
			for ( x in dic){
		    if(x==wordID){
		    hasTheWord=1;
		    break;
		    }
		    }
			if(hasTheWord==1){
			//wordID=dic[wordID];
			//var fileName=wordID+'.xml';
			//return fileName;
			LastSearchedWord=wordID;
			return dic[wordID];
		   }
		   else
		   	  return null;
		}
		function ChangeContent(){
		    var newFileName=GetAddress();
			
			if(newFileName){
			   self.parent.frames["right_frame"].location='Wort/'+newFileName;
			 var st=document.getElementById("searchField");
        		 st.focus();
        		 st.select();
			}
			//else{
			//document.getElementById("contentViewer").innerHTML="<p>"+wordID+"&nbsp;not found</p>";
			//}
		}
		function CancelHinting(){
		if(document.getElementById("searchField").value=='Please Type the word you want to search' || (LastSearchedWord!=''))
		{document.getElementById("searchField").value='';}

		}
		function Hinting(){
			if(document.getElementById("searchField").value=='')
			{
				if(LastSearchedWord!='')
					document.getElementById("searchField").value=LastSearchedWord;
				else
				document.getElementById("searchField").value='Please Type the word you want to search';
			}
		}
		function PrepareToChangeContent(e)
	{
	var keynum;
	var keychar;
	var numcheck;

	if(window.event) // IE
  	{
  	keynum = e.keyCode;
  	if(keynum=13)
  	   ChangeContent();
	}
	}

		
