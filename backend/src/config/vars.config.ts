import * as dotenv from 'dotenv'
dotenv.config({path: `../../.env`})

export const DATA_SOURCES = {
    mySqlDataSource: {
      DB_HOST: process.env.MY_SQL_DB_HOST,
      DB_USER: process.env.MY_SQL_DB_USER,
      DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
      DB_PORT: process.env.MY_SQL_DB_PORT,
      DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
      DB_CONNECTION_LIMIT: process.env.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT) : 4,
    },
    amazonCognito: {
      COGNITO_CLIENT_ID : process.env.POOL_CLIENT_ID  || "",
      COGNITO_USER_POOL_ID: process.env.USER_POOL_ID || "",
      COGNITO_REGION: process.env.USER_POOL_REGION || "",
    }
  };