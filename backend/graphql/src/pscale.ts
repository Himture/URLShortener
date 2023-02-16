import mysql from 'mysql2'

interface Env {
    DATABASE_URL: string
}

export default{
    async fetch(request: Request, env: Env, context: ExecutionContext)
{
    const connection = mysql.createConnection(env.DATABASE_URL)
    console.log('Connected to PlanetScale!')
    connection.end()
  }
}

export const resp = "success"