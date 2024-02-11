import { Hono } from 'hono'
import { hello } from './routes'
import { HonoEnvironment } from './types'

const app = new Hono<HonoEnvironment>()

app.route('/hello', hello)

export default app
