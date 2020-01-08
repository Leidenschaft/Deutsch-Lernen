<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="Entry">
<html>
	<head>
    <title>Enter your title here</title>
    <meta charset="utf-8"/>		
    <style>
      .img_1
      {
      float: right;
      margin: 1px 20% 10px 1px;
      }
    </style>
    <bgsound src="" loop="1" id="BGSOUND"/>
	</head>
  <script type="text/javascript" src="../js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="BufferSearch.js"></script>
	<body ondblclick="GetSelection()">
    <h1>
      <span id="stich_wort"><xsl:value-of select="Stichwort"/>
      </span>&#160;
      <span>
        <button type="button" id="edit_btn" hidden="hidden">编辑</button>
      </span>
			</h1>	
	<!--<br/>-->
      <xsl:if test="count(Stichwort/@link)">
        <a>
          <xsl:attribute name="href">
            <xsl:value-of select="@link"/>
          </xsl:attribute>
          <img src="icon16_search.png"/>
        </a>
      </xsl:if>
    <b><font color="#0000D0"><xsl:value-of select="Genus"/>&#160;<xsl:value-of select="Stichwort"/>&#160;</font></b>
    <xsl:if test="count(Stichwort/@Audio)">
      
        <!--<a>  
        <xsl:attribute name="href">
        ../audio/<xsl:value-of select="Stichwort"/>.mp3
      </xsl:attribute> </a>-->
        
      <img src="snd_sfx.png" style="margin-bottom:-2px" border="0" id="audioImg"></img> <!--add img click listen here-->
	  
    </xsl:if>
	
	 
	 <b><font color="#DF0101"><i><xsl:value-of select="@category"/>&#160;</i></font></b>
	 <i>plural:</i><font color="green"><b><xsl:value-of select="Pluralform"/>&#160;</b></font> 
	 <i>genetiv:</i><font color="green"><b><xsl:value-of select="GenitivSingular"/>&#160;</b></font> 
	 <div style='display:block;background-color:#f9f4bb;'>
	 <span style="color: black;font-weight:bold;">&#160;Unit:&#160;<xsl:value-of select="Einheit"/></span>&#160;
	 
	 <span style="color: black;font-weight:bold;">&#160;Part:&#160;<xsl:value-of select="Anteil"/></span>&#160;
	 </div>
	 <xsl:for-each select="AllgemeineErläuterungen/Eintrag">
	 <table border="1" bgcolor="#D07427" style="border-collapse:collapse;"><!--width=100%表示宽度上占满整个屏幕-->
     <xsl:attribute name="width">
       <xsl:choose>
         <xsl:when test="count(Stichwort/@Bild)">50%</xsl:when>
         <xsl:otherwise>100%</xsl:otherwise>
       </xsl:choose>
     </xsl:attribute>
     <tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">
       <xsl:value-of select="Chinesisch"/></font></b></span></td></tr>
    </table>
	 <xsl:for-each select="BeispielSammlung/Beispiel">
	 <ex><font color="#2F4F4F"><xsl:value-of select="Satz"/></font></ex><br/>
	 <ex><font color="#209403" face="仿宋"><xsl:value-of select="Übersetzung"/></font></ex><br/>
	 </xsl:for-each>
	 </xsl:for-each>
    <xsl:if test="count(Stichwort/@Bild)">
      <img class="img_1">
        <xsl:attribute name="src">
          ../pictures/<xsl:value-of select="Stichwort/@Bild"/>
        </xsl:attribute>
      </img>
    </xsl:if>

    <xsl:if test="count(Kollokationen/K) &gt; 0">
      <xsl:choose>
        <xsl:when test="count(Stichwort/@Bild)">
        <table width="50%" border="0" bgcolor="#697C15">	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">常用搭配</font></b></span></td></tr></table>          
        </xsl:when>
        <xsl:otherwise>
        <table width="100%" border="0" bgcolor="#697C15">	<tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">常用搭配</font></b></span></td></tr></table>
          </xsl:otherwise>
        </xsl:choose>
	<font color="saddlebrown">
	<xsl:for-each select="Kollokationen/K">
	<xsl:value-of select="."/><br/>
	</xsl:for-each>
	</font>
	</xsl:if>

	<xsl:if test="(count(zusammengesetzteWörter/KompositaCollection/K_)+count(zusammengesetzteWörter/KompositaCollection/_K)) &gt; 0">	
	<table border="0" bgcolor="#047DB1">
    <xsl:attribute name="width">
      <xsl:choose>
        <xsl:when test="count(Stichwort/@Bild)">50%</xsl:when>
        <xsl:otherwise>100%</xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
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
    <table border="0" bgcolor="#047DB1">
      <xsl:attribute name="width">
        <xsl:choose>
          <xsl:when test="count(Stichwort/@Bild)">50%</xsl:when>
          <xsl:otherwise>100%</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>

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
	<table border="0" bgcolor="#047DB1">
    <xsl:attribute name="width">
      <xsl:choose>
        <xsl:when test="count(Stichwort/@Bild)">50%</xsl:when>
        <xsl:otherwise>100%</xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>

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
	<table border="0" bgcolor="#047DB1">
    <xsl:attribute name="width">
      <xsl:choose>
        <xsl:when test="count(Stichwort/@Bild)">50%</xsl:when>
        <xsl:otherwise>100%</xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>

    <tr><td><span style="color: #FFFFFF;"><b><font face="仿宋">反义词</font></b></span></td></tr></table>
	<font color="saddlebrown">
	<xsl:for-each select="Antonymegruppe/Anm">
	<xsl:if test="count(@link)">
	<a><xsl:attribute name="href"><xsl:value-of select="@link"/></xsl:attribute><img src="icon16_search.png"/></a>
	</xsl:if>
	<xsl:value-of select="."/>&#160;</xsl:for-each>
	</font>
	</xsl:if><br/>
	
<!--	<button id="ClipBoardSearchButton" onclick="BufferSearch()">查询当前剪贴板中的单词</button>-->
	</body>
</html>
</xsl:template>
</xsl:stylesheet>