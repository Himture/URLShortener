import mysql from "mysql2"
import { nanoid } from 'nanoid';

let dburl = process.env["DATABASE_URL"]

const connection = mysql.createConnection(dburl as string)
const USER_TABLE = "user"
const LINKS_TABLE = "links"

export async function createShortUrl(oLink:String, sLink:String, userId:String, tag:String) {

  const [result] = await connection.execute(
    `INSERT INTO ${LINKS_TABLE} (oLink, sLink, userID, tag) VALUES (?, ?, ?, ?)`,
    [oLink, sLink, userId, tag]
  );

  return result.insertId;
}

export async function getShortUrlByShortId(sLink:String) {
  const [result] = await connection.execute(
    `SELECT oLink, sLink, userID, tag FROM ${LINKS_TABLE} WHERE short_id = ?`,
    [sLink]
  );

  return result[0];
}

export async function deleteShortUrlById(sLink: Number) {
  const [result] = await connection.execute(`DELETE FROM ${LINKS_TABLE} WHERE sLink = ?`, [sLink]);

  return result.affectedRows > 0;
}

export async function getUserByEmail(email:String) {
  const [result] = await connection.execute(
    `SELECT name, email, uID, slinks FROM ${USER_TABLE} WHERE email = ?`,
    [email]
  );

  return result[0];
}

export async function createUser(name:String, email:String, password:String) {

  const uID = nanoid(8);

  const [result] = await connection.execute(
    `INSERT INTO ${USER_TABLE} (name, email, uID) VALUES (?, ?, ?)`,
    [name, email, uID]
  );

  return result.insertId;
}