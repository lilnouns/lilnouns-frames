import { Hono } from 'hono'
import { hello } from './routes'

const app = new Hono()

app.route('/hello', hello)

export default app
