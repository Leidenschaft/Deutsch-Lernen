<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="Entry">
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Adjective Render Template</title>
	</head>
   <script type="text/javascript" src="../../js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="BufferSearch.js"></script>
	<body ondblclick="GetSelection()">
			<h1><span><b>
        <xsl:value-of select="Stichwort"/><!---此处为标题字体<font face=".Helvetica Neue Interface"></font>-->
        
      </b></span>
	        <span>
        <button type="button" id="edit_btn" hidden="hidden">编辑</button>
      </span></h1><br/>
	<xsl:if test="count(Ausspache)">
	<b><font color="#0000D0">&#160;<xsl:value-of select="Ausspache"/>&#160;</font></b>
	</xsl:if>  

	
	<xsl:if test="not(@category='unspecified')">
	 <b><font color="#DF0101"><i><xsl:value-of select="@category"/>&#160;</i></font></b>
	</xsl:if>

	  <div style='display:block;background-color:#f9f4bb;'>
	 <span style="color: black;font-weight:bold;">&#160;Unit:&#160;<xsl:value-of select="Einheit"/></span>&#160;

    <xsl:if test="count(Anteil)">
        <span style="color: black;font-weight:bold;">&#160;Part:&#160;<xsl:value-of select="Anteil"/></span>&#160;
    </xsl:if>
	 </div>
	 <xsl:for-each select="AllgemeineErläuterungen/Eintrag">
	 <table width="100%" border="1" bgcolor="#D07427" style="border-collapse:collapse;"><!--width=100%表示宽度上占满整个屏幕-->
	 <tr><td><span style="color: #FFFFFF;"><b><font face="仿宋"><xsl:value-of select="Chinesisch"/></font></b></span></td></tr></table>
	 <xsl:for-each select="BeispielSammlung/Beispiel">
	 <ex><font color="#2F4F4F"><xsl:value-of select="Satz"/></font></ex><br/>
	 <ex><font color="#59C945" face="仿宋"><xsl:value-of select="Übersetzung"/></font></ex><br/>
	 </xsl:for-each>
	 </xsl:for-each>

	<xsl:if test="count(Kollokationen/K) &gt; 0">
	<table width="100%" border="0" bgcolor="#697C15">
	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">常用搭配</font></b></span></td></tr></table>
	<font color="saddlebrown">
	<xsl:for-each select="Kollokationen/K">
	<xsl:value-of select="."/><br/>
	</xsl:for-each>
	</font>
	</xsl:if>

	<xsl:if test="(count(zusammengesetzteWörter/KompositaCollection/K_)+count(zusammengesetzteWörter/KompositaCollection/_K)) &gt; 0">	
	<table width="100%" border="0" bgcolor="#047DB1">
	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">合成词</font></b></span></td></tr></table>
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
	<xsl:for-each select="zusammengesetzteWörter/KompositaCollection/_K">
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<xsl:value-of select="."/> &#160;&#160;
	</xsl:for-each>	
	</font>
	</xsl:if>
	
	<xsl:if test="count(zusammengesetzteWörter/abgeleiteteWörter/hierzu) &gt; 0">
    <table width="100%" border="0" bgcolor="#047DB1">
	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">派生词</font></b></span></td></tr></table>
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
	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">同义词</font></b></span></td></tr></table>
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
	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">反义词</font></b></span></td></tr></table>
	<font color="saddlebrown">
	<xsl:for-each select="Antonymegruppe/Anm">
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<xsl:value-of select="."/>&#160;</xsl:for-each>
	</font>
	</xsl:if><br/>
	
	</body>
</html>
</xsl:template>
</xsl:stylesheet>