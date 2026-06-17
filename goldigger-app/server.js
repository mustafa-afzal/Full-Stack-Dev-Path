import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'public', 'index.html')
    serveStatic(res, filePath)
  }
  else if (req.url === '/prices') {
    handlePrices(res)
  }
  else if (req.url === '/invest' && req.method === 'POST') {
    parseJSONBody(req, res)
  }
  else {
    const filePath = path.join(__dirname, 'public', req.url)
    serveStatic(res, filePath)
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png'
}


async function serveStatic(res, filePath) {
  try {
    const content = await fs.readFile(filePath)
    res.setHeader('Content-Type', getContentType(filePath))
    res.statusCode = 200
    res.end(content)
  }
  catch (err) {
    console.error(err)
    const filePath = path.join(__dirname, 'public', '404.html')
    const content = await fs.readFile(filePath)
    res.setHeader('Content-Type', getContentType(filePath))
    res.statusCode = 404
    res.end(content)
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath)
  return mimeTypes[ext] || 'text/plain'
}

function handlePrices(res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  let currPrice = 4259

  res.write(
      `data: ${JSON.stringify({ price: currPrice})}\n\n`
    )

  setInterval(function() {
    const change = Math.random() < 0.5 ? -5 : 5
    currPrice += change
    res.write(
      `data: ${JSON.stringify({ price: currPrice})}\n\n`
    )
  }, 5000)
}

function parseJSONBody(req, res) {
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    const parsed = JSON.parse(body)
    fs.appendFile(path.join(__dirname, 'investments.txt'), body, 'utf8')
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 201
    res.end(JSON.stringify({ message: 'Success' }))
  })
  
}

