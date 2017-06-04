<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="Entry">
<div id="Noun">
    <h1>
      <span id="stich_wort"><xsl:value-of select="Stichwort"/></span>&#160;
	</h1>	
	<p>
      <xsl:if test="count(Stichwort/@link)">
        <a>
          <xsl:attribute name="href">
            <xsl:value-of select="@link"/>
          </xsl:attribute>
          <img src="icon16_search.png"/>
        </a>
      </xsl:if>
    <span><xsl:value-of select="Genus"/>&#160;<xsl:value-of select="Stichwort"/></span>
	<span>
    <xsl:if test="count(Stichwort/@Audio)">
      
      <img src="snd_sfx.png" style="margin-bottom:-2px" border="0" id="audioImg"></img> <!--add img click listen here-->
	  
    </xsl:if>
	</span> 
	<span>
	 <xsl:value-of select="@category"/>&#160;
	 plural:<input>     <xsl:attribute name="style">width:<xsl:value-of select="min(50,string-length(Pluralform)*8)"/>px</xsl:attribute>
     <xsl:attribute name="value"><xsl:value-of select="Pluralform"/></xsl:attribute>
	 </input>&#160; 
	 genetiv:<input>
     <xsl:attribute name="style">width:<xsl:value-of select="string-length(GenitivSingular)*8"/>px</xsl:attribute>
     <xsl:attribute name="value"><xsl:value-of select="GenitivSingular"/></xsl:attribute></input>&#160;
	 </span>
	 </p>
	 <div>
	 <ul>
	 <xsl:for-each select="AllgemeineErläuterungen/Eintrag"><li>
     <span>
	 <input><xsl:attribute name="value"><xsl:value-of select="Chinesisch"/></xsl:attribute></input>
	 </span>
	 	 <ul>
	   <xsl:for-each select="BeispielSammlung/Beispiel"><li><p>
	 <input>
     <xsl:attribute name="style">
       width:<xsl:value-of select="string-length(Satz)*8"/>px
     </xsl:attribute>

     <xsl:attribute name="value"><xsl:value-of select="Satz"/></xsl:attribute></input></p>
	 <p><input>
     <xsl:attribute name="style">
       width:<xsl:value-of select="string-length(Übersetzung)*14"/>px
     </xsl:attribute>

     <xsl:attribute name="value"><xsl:value-of select="Übersetzung"/></xsl:attribute></input></p></li>
	 </xsl:for-each>
	 </ul></li>
	 </xsl:for-each>
	 </ul>
    <xsl:if test="count(Kollokationen/K) &gt; 0">
	 <ul style="list-style-type:square;">
	<span>常用搭配</span>
      <xsl:for-each select="Kollokationen/K"><li>
	<input><xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute></input></li>
	</xsl:for-each>
	</ul>
	</xsl:if>
	
	<xsl:if test="(count(zusammengesetzteWörter/KompositaCollection/K_)+count(zusammengesetzteWörter/KompositaCollection/_K)) &gt; 0">	
	<ul><p>合成词</p>
	<!--<xsl:value-of select="count(zusammengesetzteWörter/KompositaCollection/_K)"/>-->
	<xsl:for-each select="zusammengesetzteWörter/KompositaCollection/K_">
	<li class="horizontal_list"><span>
      <xsl:choose>
        <xsl:when test="count(@link)"><a><xsl:attribute name="href">?wordAddress=N<xsl:value-of select="@link"/></xsl:attribute><input><xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute></input></a></xsl:when>
        <xsl:otherwise><input><xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute></input></xsl:otherwise>
      </xsl:choose></span>
	</li>
	</xsl:for-each>
	<xsl:for-each select="zusammengesetzteWörter/KompositaCollection/_K">
	<li class="horizontal_list"><span>
      <xsl:choose>
       <xsl:when test="count(@link)"><a><xsl:attribute name="href">?wordAddress=N<xsl:value-of select="@link"/></xsl:attribute><xsl:value-of select="."/></a></xsl:when>
       <xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
      </xsl:choose></span>
	</li>
	</xsl:for-each>	
	</ul>
	</xsl:if>

	<xsl:if test="count(zusammengesetzteWörter/abgeleiteteWörter/hierzu) &gt; 0">
	<ul><p style="clear:left">派生词</p>
	<xsl:for-each select="zusammengesetzteWörter/abgeleiteteWörter/hierzu">
	<li class="horizontal_list">
	<span>[<xsl:value-of select="@category"/>]
      <xsl:choose>
        <xsl:when test="count(@link)"><a><xsl:attribute name="href">?wordAddress=N<xsl:value-of select="@link"/></xsl:attribute><xsl:value-of select="."/></a></xsl:when>
        <xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
      </xsl:choose>
	  </span>
	</li>
	</xsl:for-each></ul>
	</xsl:if>

	<xsl:if test="count(Synonymegruppe/Sym) &gt; 0">
    <ul><p style="clear:left">同义词</p>
    <xsl:for-each select="Synonymegruppe/Sym">
	<li class="horizontal_list">
	<span>
      <xsl:choose>
        <xsl:when test="count(@link)"><a><xsl:attribute name="href">?wordAddress=N<xsl:value-of select="@link"/></xsl:attribute><xsl:value-of select="."/></a></xsl:when>
        <xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
      </xsl:choose>
	  </span>
	</li>
	</xsl:for-each>
	</ul>
	</xsl:if>
	<xsl:if test="count(Antonymegruppe/Anm) &gt; 0">
    <ul><p style="clear:left">反义词</p>
    <xsl:for-each select="Antonymegruppe/Anm">
	<li class="horizontal_list">
	<span>
      <xsl:choose>
        <xsl:when test="count(@link)"><a><xsl:attribute name="href">?wordAddress=N<xsl:value-of select="@link"/></xsl:attribute><xsl:value-of select="."/></a></xsl:when>
        <xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
      </xsl:choose>
	  </span>
	</li>
	</xsl:for-each>
	</ul>
	</xsl:if>

	</div>
</div>
	</xsl:template>
</xsl:stylesheet>