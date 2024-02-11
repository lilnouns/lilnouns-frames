import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { domains, hello } from './routes'
import { Environment } from './types'

const app = new Hono<Environment>()

app.use(logger())

app.route('/hello', hello)

app.route('/domains', domains)

export default app
