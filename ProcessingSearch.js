var srcTree = new ActiveXObject("Msxml2.DOMDocument.6.0");
srcTree.async=false;
srcTree.load('Wordlist_11.xml');
var xsltTree= new ActiveXObject("Msxml2.DOMDocument.6.0");
        xsltTree.async = false;
        // You can substitute other XSLT file names here.
        xsltTree.load("navigation.xslt");
document.getElementById("resTree").innerHTML=srcTree.transformNode(xsltTree);

		var dic=new Array();
		var xmlObj=srcTree.documentElement.childNodes;
		for(j=0;j<xmlObj.length;j++){
			var entry=xmlObj.item(j);
			var jplus=j+1;
			dic[entry.text]=jplus.toString();	
		}
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
			wordID=dic[wordID];
			var fileName=wordID+'.xml';
			return fileName;
		   }
		   else
		   	  return null;
		}
		function ChangeContent(){
		    var newFileName=GetAddress();
			
			if(newFileName)
			   self.parent.frames["right_frame"].location='Wort/'+newFileName;
			
			//else{
			//document.getElementById("contentViewer").innerHTML="<p>"+wordID+"&nbsp;not found</p>";
			//}
		}
		
