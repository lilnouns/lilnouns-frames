import { Hono } from 'hono'
import { html, raw } from 'hono/html'
import type { Environment, FrameSignaturePacket } from '../types'
import {
  checkENSExists,
  getAvailableDomainImage,
  getCheckImage,
  getInvalidDomainImage,
  getStartImage,
  getUnavailableDomainImage,
} from '../utils'

const app = new Hono<Environment>()

app.all('/', (c) => {
  const redirectUrl = 'https://lil.domains'
  const frameImage = getStartImage(c)
  const framePostUrl = `${c.req.url}/start`

  return c.html(html`
    <html lang="en">
      <head>
        <title>Lil Nouns Subdomain</title>
        <meta http-equiv="refresh" content="3; url=${redirectUrl}" />

        <meta property="og:image" content="${frameImage}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${frameImage}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:post_url" content="${framePostUrl}" />
        <meta property="fc:frame:button:1" content="Start" />
      </head>
      <body>
        <h1>Redirecting...</h1>
      </body>
    </html>
  `)
})

app.post('/start', async (c) => {
  try {
    const frameImage = getCheckImage(c)
    const framePostUrl = c.req.url.replace('/start', '/check')

    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${frameImage}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:post_url" content="${framePostUrl}" />
          <meta property="fc:frame:input:text" content="Enter a name" />
          <meta property="fc:frame:button:1" content="Back" />
          <meta property="fc:frame:button:2" content="Check" />
          <title>Farcaster Frames</title>
        </head>
      </html>
    `)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})

app.post('/check', async (c) => {
  try {
    const body = await c.req.json<FrameSignaturePacket>()
    const { buttonIndex, inputText } = body.untrustedData

    const domainName = ((inputText || '?') + '.lilnouns.eth').toLowerCase()
    const domainValid = /^[^-]([\p{L}\p{N}-]+)[^-]\.lilnouns\.eth$/u.test(
      domainName,
    )
    const domainExist = await checkENSExists(domainName)

    const framePostUrl = c.req.url
    const frameBackUrl = c.req.url.replace('/check', '')
    if (buttonIndex === 1) return c.redirect(frameBackUrl)

    let frameImage: string
    if (!domainValid) {
      frameImage = getInvalidDomainImage(c, domainName)
    } else if (domainExist) {
      frameImage = getUnavailableDomainImage(c, domainName)
    } else {
      frameImage = getAvailableDomainImage(c, domainName)
    }

    const frameAction =
      !domainValid || domainExist
        ? `
         <meta property="fc:frame:post_url" content="${framePostUrl}" />
         <meta property="fc:frame:input:text" content="Enter a name" />
         <meta property="fc:frame:button:2" content="Check" />`
        : `
         <meta property="fc:frame:button:2:action" content="link" />
         <meta property="fc:frame:button:2:target" content="https://lil.domains" />
         <meta property="fc:frame:button:2" content="Claim" />`

    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${frameImage}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:post_url" content="${framePostUrl}" />
          <meta property="fc:frame:button:1" content="Back" />
          ${raw(frameAction)}
          <title>Farcaster Frames</title>
        </head>
      </html>
    `)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})

export default app
