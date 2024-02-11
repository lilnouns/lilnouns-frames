import { Hono } from 'hono'
import { hello } from './routes'
import { Environment } from './types'

const app = new Hono<Environment>()

app.route('/hello', hello)

export default app
