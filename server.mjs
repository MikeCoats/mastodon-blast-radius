import 'dotenv/config'

import express from 'express'

const app = express()

/**
 * Our server only relies on upstream HTTP connections, no databases or
 * caches, etc, so as long as we're up and can make outgoing web
 * requests, we're 'OK'.
 */
app.get('/health', async (req, res) => {
  // Try to access my mastodon instance. If we fail for any reason,
  // we're 'Not OK'.
  try {
    await fetch('https://mikecoats.social/api/v1/timelines/public?limit=1')
  } catch (_err) {
    res.status(500).send({ status: 'Not OK.' })
    return
  }

  res.status(200).send({ status: 'OK' })
})

// Grab the port from the `.env` file, an environment variable or just
// default to good old 3000.
const port = process.env.PORT || 3000
console.log(`Listening on http://localhost:${port}`)
app.listen(port)
