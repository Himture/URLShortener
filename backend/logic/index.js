let a = 0
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(DATABASE_URL)
a = 1
console.log('Connected to PlanetScale!')
connection.end()


async function handleRequest(request) {
  return new Response(`${a}`, {
    headers: { 'content-type': 'text/plain' },
  })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})