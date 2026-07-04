const fs = require('fs')
const path = require('path')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { password, content } = body

    // Password is verified server-side against a non-VITE env var so it is never
    // shipped to the client bundle. The admin UI sends it with each save request.
    const expected = process.env.ADMIN_PASSWORD
    if (!expected) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'ADMIN_PASSWORD is not configured on the server.' }),
      }
    }
    if (!password || password !== expected) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized: wrong password.' }),
      }
    }

    if (!content || typeof content !== 'object') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing content payload.' }),
      }
    }

    // Resolve path to content.json relative to the project root
    const filePath = path.join(process.cwd(), 'content.json')
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8')

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
