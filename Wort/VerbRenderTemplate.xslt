<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="Entry">
<html>
	<head>
    <title>Enter your title here</title>

    <meta charset="utf-8"/>	
		 <link rel="stylesheet" href="style.css" type="text/css" media="screen"/>	
	</head>
  <script type="text/javascript" src="../js/jquery-1.9.1.min.js"></script>
  <script type="text/javascript" src="BufferSearch.js"></script>
	<body ondblclick="GetSelection()">
			<h1><b>
        <xsl:value-of select="Stichwort"/><!---此处为标题字体<font face=".Helvetica Neue Interface"></font>-->
        
      </b></h1><br/>
    
	<table width="100%" align="center" border="0"><tr>
	<td width="50%" style="font-family:Times New Roman">
    <!--设置主要的英文字体为Times New Roman-->
    <xsl:if test="count(Stichwort/@Bild)">
      <img class="img_1">
        <xsl:attribute name="src">
          ../images/<xsl:value-of select="Stichwort/@Bild"/>
        </xsl:attribute>
      </img>
    </xsl:if>

    <div style="line-height:20px"><!--调整行距-->
	<b><font color="#0000D0">&#160;<xsl:value-of select="Stichwort"/>&#160;</font></b>
	<a href="sound://p008__001776626.spx" >
	 <img src="snd_sfx.png" style="margin-bottom:-2px" border="0" ></img>
	</a>
	
	 
	 <b><font color="#DF0101"><i><xsl:value-of select="@category"/>&#160;</i></font></b>
	  <div style='display:block;background-color:#f9f4bb;'>
	 <span style="color: black;font-weight:bold;">&#160;Unit:&#160;<xsl:value-of select="Einheit"/></span>&#160;
	 
	 <span style="color: black;font-weight:bold;">&#160;Part:&#160;<xsl:value-of select="Anteil"/></span>&#160;
	 </div>
	 <xsl:for-each select="AllgemeineErläuterungen/Eintrag">
	 <table width="100%" border="1" bgcolor="#D07427" style="border-collapse:collapse;"><!--width=100%表示宽度上占满整个屏幕-->
	 <tr><td><span style="color: #FFFFFF;"><b><font face="黑体"><xsl:value-of select="Chinesisch"/></font></b></span></td></tr></table>
	 <xsl:for-each select="BeispielSammlung/Beispiel">
	 <ex><font color="#2F4F4F"><xsl:value-of select="Satz"/></font></ex><br/>
	 <ex><font color="#59C945" face="宋体"><xsl:value-of select="Übersetzung"/></font></ex><br/>
	 </xsl:for-each>
	 </xsl:for-each>

	<xsl:if test="count(Kollokationen/K) &gt; 0">
	<table width="100%" border="0" bgcolor="#697C15">
	<tr><td><span style="color: #FFFFFF;"><b><font face="黑体">常用搭配</font></b></span></td></tr></table>
	<font color="saddlebrown">
	<xsl:for-each select="Kollokationen/K">
	<xsl:value-of select="."/><br/>
	</xsl:for-each>
	</font>
	</xsl:if>

	<xsl:if test="(count(zusammengesetzteWörter/KompositaCollection/K_)+count(zusammengesetzteWörter/KompositaCollection/_K)) &gt; 0">	
	<table width="100%" border="0" bgcolor="#047DB1">
	<tr><td><span style="color: #FFFFFF;"><b><font face="黑体">合成词</font></b></span></td></tr></table>
	<font color="gray">
	<!--<xsl:value-of select="count(zusammengesetzteWörter/KompositaCollection/_K)"/>-->
	<xsl:for-each select="zusammengesetzteWörter/KompositaCollection/K_">
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<xsl:value-of select="."/> &#160;&#160;
	</xsl:for-each>
	</font>
	<font color="maroon">
	<xsl:for-each select="zusammengesetzteWörter/KompositaCollection/_K | zusammengesetzteWörter/KompositaCollection/_K_">
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<xsl:value-of select="."/> &#160;&#160;
	</xsl:for-each>	
	</font>
	</xsl:if>
	
	<xsl:if test="count(zusammengesetzteWörter/abgeleiteteWörter/hierzu) &gt; 0">
    <table width="100%" border="0" bgcolor="#047DB1">
	<tr><td><span style="color: #FFFFFF;"><b><font face="黑体">派生词</font></b></span></td></tr></table>
	<xsl:for-each select="zusammengesetzteWörter/abgeleiteteWörter/hierzu">
	<font color="saddlebrown">	
	▪<xsl:value-of select="."/>&#160;</font> 
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<b><font color="#DF0101"><i><xsl:value-of select="@category"/></i></font></b>&#160;&#160;
	</xsl:for-each>
	</xsl:if>
	
	<xsl:if test="count(Synonymegruppe/Sym) &gt; 0">
	<table width="100%" border="0" bgcolor="#047DB1">
	<tr><td><span style="color: #FFFFFF;"><b><font face="黑体">同义词</font></b></span></td></tr></table>
	<font color="saddlebrown">
		<xsl:for-each select="Synonymegruppe/Sym">
		<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	▪<xsl:value-of select="."/>&#160;</xsl:for-each>
	</font>
	</xsl:if>
	
	<xsl:if test="count(Antonymegruppe/Anm) &gt; 0">
	<table width="100%" border="0" bgcolor="#047DB1">
	<tr><td><span style="color: #FFFFFF;"><b><font face="黑体">反义词</font></b></span></td></tr></table>
	<font color="saddlebrown">
	<xsl:for-each select="Antonymegruppe/Anm">
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<xsl:value-of select="."/>&#160;</xsl:for-each>
	</font>
	</xsl:if><br/>
    </div>    
		</td>
		<td width="50%">
    <table class="table1">
                <thead>
                    <tr>
                        <th>&#160;</th>
                        <th scope="col" abbr="Starter">一般现在时</th>
                        <th scope="col" abbr="Medium" >一般过去时</th>
                        <th scope="col" abbr="Business">现在完成时</th>  
                    </tr>
                </thead>
              
                <tbody>
                    <tr>
                        <th scope="row">ich</th>
                        <td><xsl:value-of select="Konjugation/Präsen/ich"/> </td>
                        <td><xsl:value-of select="Konjugation/Präteritum/ich"/></td>
                        <td><xsl:value-of select="Konjugation/Perfekt/ich"/> </td>
                   
                    </tr>
                    <tr>
                        <th scope="row">du</th>
                        <td><xsl:value-of select="Konjugation/Präsen/du"/></td>
                        <td><xsl:value-of select="Konjugation/Präteritum/du"/></td>
                        <td><xsl:value-of select="Konjugation/Perfekt/du"/>  </td>
                  
                    </tr>
                    <tr>
                        <th scope="row">er/sie/es</th>
                        <td><xsl:value-of select="Konjugation/Präsen/er_sie_es"/></td>
                        <td><xsl:value-of select="Konjugation/Präteritum/er_sie_es"/></td>
                        <td> <xsl:value-of select="Konjugation/Perfekt/er_sie_es"/> </td>
                     
                    </tr>
                    <tr>
                        <th scope="row">wir</th>
                        <td><xsl:value-of select="Konjugation/Präsen/wir"/></td>
                        <td><xsl:value-of select="Konjugation/Präteritum/wir"/></td>
                        <td><xsl:value-of select="Konjugation/Perfekt/wir"/></td>
                    
                    </tr>
                    <tr>
                        <th scope="row">ihr</th>
                        <td><xsl:value-of select="Konjugation/Präsen/ihr"/></td>
                        <td><xsl:value-of select="Konjugation/Präteritum/ihr"/></td>
                        <td> <xsl:value-of select="Konjugation/Perfekt/ihr"/></td>
                      
                    </tr>
                    <tr>
                        <th scope="row">sie/Sie</th>
                        <td><xsl:value-of select="Konjugation/Präsen/sie_Sie"/></td>
                        <td><xsl:value-of select="Konjugation/Präteritum/sie_Sie"/></td>
                        <td><xsl:value-of select="Konjugation/Perfekt/sie_Sie"/> </td>
                      
                    </tr>
                </tbody>
            </table>  		
		
		
		</td></tr></table>
	<button id="ClipBoardSearchButton" onclick="BufferSearch()">查询当前剪贴板中的单词</button>
	</body>
</html>
</xsl:template>
</xsl:stylesheet>
