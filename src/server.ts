import * as bodyParser from 'body-parser'
import * as express from 'express'
import { env } from 'decentraland-commons'
import { OptionRouter } from './Option'
import { PollRouter } from './Poll'
import { VoteRouter } from './Vote'
import { TranslationRouter } from './Translation'
import { db } from './database'

env.load()

const SERVER_PORT = env.get('SERVER_PORT', 5000)

const app = express()

app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }))
app.use(bodyParser.json())

if (env.isDevelopment()) {
  app.use(function(_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    next()
  })
}

new PollRouter(app).mount()
new OptionRouter(app).mount()
new VoteRouter(app).mount()
new TranslationRouter(app).mount()

/* Start the server only if run directly */
if (require.main === module) {
  startServer().catch(console.error)
}

async function startServer() {
  console.log('Connecting database')
  await db.connect()

  return app.listen(SERVER_PORT, () =>
    console.log('Server running on port', SERVER_PORT)
  )
}
