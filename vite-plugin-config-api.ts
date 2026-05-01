import fs from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

export default function configApiPlugin(): Plugin {
  return {
    name: 'config-api',
    configureServer(server) {
      server.middlewares.use('/api/config', async (req, res, next) => {
        const url = req.url?.split('?')[0] || '/'
        if (url !== '/' && url !== '') {
          return next()
        }

        const CONFIG_PATH = path.resolve(process.cwd(), 'config.json')

        if (req.method === 'GET') {
          try {
            const data = await fs.readFile(CONFIG_PATH, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
          } catch (err: any) {
            if (err.code === 'ENOENT') {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({})) // Default empty if not exist
            } else {
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Failed to read config' }))
            }
          }
        } else if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', async () => {
            try {
              // Parse to validate JSON
              const config = JSON.parse(body)
              await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Invalid JSON or write failed' }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}
