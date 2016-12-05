<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match="Wordlist">
	<html>
		<head>
			<title>Wordlist</title>
		</head>
		<body>
		<h3>Wordlist:</h3>
		<xsl:apply-templates/>
	   
		
		</body>
	</html>
</xsl:template>



<xsl:template match="Word">
<a><xsl:attribute name="href">Wort/<xsl:value-of select="@address"/></xsl:attribute>
<xsl:attribute name="target">right_frame</xsl:attribute>
<xsl:value-of select="."/></a>
<br/>
</xsl:template>

</xsl:stylesheet>