<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <title><xsl:value-of select="rss/channel/title"/></title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #333; }
        h1 { color: #1a1a2e; border-bottom: 2px solid #eb5b72; padding-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }
        .item { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #eee; }
        .item:last-child { border-bottom: none; }
        .item-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; }
        .item-title a { color: #1a1a2e; text-decoration: none; }
        .item-title a:hover { color: #eb5b72; }
        .item-date { font-size: 0.875rem; color: #888; margin-bottom: 0.5rem; }
        .item-description { color: #555; margin: 0; }
        .categories { margin-top: 0.5rem; }
        .category { display: inline-block; background: #f0f0f0; padding: 0.125rem 0.5rem; border-radius: 4px; font-size: 0.75rem; margin-right: 0.5rem; color: #555; }
        .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; color: #888; font-size: 0.875rem; }
      </style>
    </head>
    <body>
      <h1><xsl:value-of select="rss/channel/title"/></h1>
      <p class="description"><xsl:value-of select="rss/channel/description"/></p>
      <xsl:for-each select="rss/channel/item">
        <div class="item">
          <h2 class="item-title"><a href="{link}"><xsl:value-of select="title"/></a></h2>
          <p class="item-date"><xsl:value-of select="pubDate"/></p>
          <p class="item-description"><xsl:value-of select="description" disable-output-escaping="yes"/></p>
          <xsl:if test="category">
            <div class="categories">
              <xsl:for-each select="category">
                <span class="category"><xsl:value-of select="."/></span>
              </xsl:for-each>
            </div>
          </xsl:if>
        </div>
      </xsl:for-each>
      <div class="footer">
        <p><a href="https://blog.tomanote.app">blog.tomanote.app</a> — <a href="https://tomanote.app">TomaNote App</a></p>
      </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>