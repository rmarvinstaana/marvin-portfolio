const fs = require('fs')
const path = require('path')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const data = JSON.parse(event.body)

    // Resolve path to content.json relative to the project root
    const filePath = path.join(process.cwd(), 'content.json')

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

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
