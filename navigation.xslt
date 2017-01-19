<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match="Wordlist">
	<html>
		<head>
			<title>Wordlist</title>
      <script type="text/javascript" src="jquery-1.9.1.min.js"></script>
  
    </head>
		<body>
		<!--<xsl:apply-templates/>
	   -->
      <xsl:for-each select="Word">
        <xsl:sort select="."/>
        <a>
          <xsl:attribute name="href">
            Wort/<xsl:value-of select="@address"/>
          </xsl:attribute>
          <xsl:attribute name="id">
            <xsl:value-of select="."/>
          </xsl:attribute>
          <xsl:attribute name="target">right_frame</xsl:attribute>
          <xsl:value-of select="."/>
        </a>
        <br/>

      </xsl:for-each>
		
		</body>
	</html>
</xsl:template>


<!--
<xsl:template match="Word">
  <a><xsl:attribute name="href">Wort/<xsl:value-of select="@address"/></xsl:attribute>
<xsl:attribute name="target">right_frame</xsl:attribute>
<xsl:value-of select="."/></a>
<br/>
</xsl:template>
-->
</xsl:stylesheet>
