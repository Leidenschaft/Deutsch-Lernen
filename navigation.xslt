<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="Wordlist">
	<html>
		<head>
      <META http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<title>Wordlist</title>
      <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
  
    </head>
		<body><ul>
      <xsl:for-each select="Word">
        <xsl:sort select="."/><!--notice here we sort the wordlist!--><li>
        <a>
          <xsl:attribute name="href">
            Wort/<xsl:value-of select="@address"/>
          </xsl:attribute>
          <xsl:attribute name="id">
            <xsl:value-of select="."/>
          </xsl:attribute>
          <xsl:attribute name="target">right_frame</xsl:attribute>
          <xsl:value-of select="."/>
        </a></li>

      </xsl:for-each>
			</ul>
		</body>
	</html>
</xsl:template>
</xsl:stylesheet>
