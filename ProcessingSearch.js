var srcTree = new ActiveXObject("Msxml2.DOMDocument.6.0");
srcTree.async=false;
srcTree.load('Wordlist_11.xml');
var xsltTree= new ActiveXObject("Msxml2.DOMDocument.6.0");
        xsltTree.async = false;
        // You can substitute other XSLT file names here.
        xsltTree.load("navigation.xslt");
        self.parent.frames["wordList"].document.getElementById("resTree").innerHTML=srcTree.transformNode(xsltTree);
//document.getElementById("resTree").innerHTML=srcTree.transformNode(xsltTree);

		var dic=new Array();
		var xmlObj=srcTree.documentElement.childNodes;
		for(j=0;j<xmlObj.length;j++){
			var entry=xmlObj.item(j);
			var attr=entry.attributes.item(0).value;
			//var jplus=j+1;//here getAttribute method should be used;
			dic[entry.text]=attr;//jplus.toString();	
		}
		
		var LastSearchedWord='';
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

		
