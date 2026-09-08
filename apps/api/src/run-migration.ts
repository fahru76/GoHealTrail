import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sqlPath = join(__dirname, 'schema.sql')
const sql = readFileSync(sqlPath, 'utf8')

console.log(sql)
