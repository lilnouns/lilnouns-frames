import { Hono } from 'hono'
import { html } from 'hono/html'
import type { FrameSignaturePacket } from '../types'

const app = new Hono()

app.get('/', (c) => {
  const frameImage = `https://placehold.co/600x400?text=Hello+World`
  const framePostUrl = c.req.url

  return c.html(html`
    <html lang="en">
      <head>
        <meta property="og:image" content="${frameImage}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${frameImage}" />
        <meta property="fc:frame:post_url" content="${framePostUrl}" />
        <meta property="fc:frame:button:1" content="Green" />
        <meta property="fc:frame:button:2" content="Purple" />
        <meta property="fc:frame:button:3" content="Red" />
        <meta property="fc:frame:button:4" content="Blue" />
        <title>Farcaster Frames</title>
      </head>
      <body>
        <h1>Hello Farcaster!</h1>
      </body>
    </html>
  `)
})

app.post('/', async (c) => {
  try {
    const body = await c.req.json<FrameSignaturePacket>()
    const { buttonIndex, inputText } = body.untrustedData

    const backgroundColors = ['green', 'purple', 'red', 'blue']

    const imageText = encodeURIComponent(inputText || 'Hello World')
    const imageColor = backgroundColors[buttonIndex - 1] || 'white'

    const frameImage = `https://placehold.co/600x400/${imageColor}/white?text=${imageText}`
    const framePostUrl = c.req.url

    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${frameImage}" />
          <meta property="fc:frame:post_url" content="${framePostUrl}" />
          <meta property="fc:frame:input:text" content="Enter a message" />
          <meta property="fc:frame:button:1" content="Green" />
          <meta property="fc:frame:button:2" content="Purple" />
          <meta property="fc:frame:button:3" content="Red" />
          <meta property="fc:frame:button:4" content="Blue" />
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
