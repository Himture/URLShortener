import { connect } from "@planetscale/database";

console.log("trying connection");
const connection = connect({
  host: "ap-south.connect.psdb.cloud",
  username: "ztdr8onhp0qt5yfxlkai",
  password: "pscale_pw_Jx20m0XBDMZUMSKsRZNPz228KhY6Jc9lam4WQgcwdcB",
});
const USER_TABLE = "user";
const LINKS_TABLE = "links";

export async function createShortUrl(oLink: string, sLink: string, username: string) {
    const result = await connection.execute(`INSERT INTO ${LINKS_TABLE} (oLink, sLink, username) VALUES (?, ?, ?);`, [oLink, sLink, username]);
    const res = JSON.stringify(result)
    return res;
}

export async function getUrlByShortUrl(sLink: string) {
    const query = `SELECT oLink, sLink FROM ${LINKS_TABLE} WHERE sLink = ?;`;
    const result = await connection.execute(query, [sLink]);
    return result.rows;
  }

export async function getAllShortURL(username: String) {
    const query = `SELECT oLink, sLink, username, tag FROM ${LINKS_TABLE} WHERE username = ?;`;
    const result = await connection.execute(query, [username]);
    console.log(result)
    return result.rows;
}

export async function updateShortUrl(sLink:string, oLink:string, username:string) {
  const result = await connection.execute(`UPDATE ${LINKS_TABLE} SET oLink = ? WHERE sLink = ? AND username = ?`, [oLink, sLink, username]);
    return result.rows;
}

export async function deleteShortUrl(sLink: string, username:string) {
    const result = await connection.execute(`DELETE FROM ${LINKS_TABLE} WHERE sLink = ? AND username = ?`, [sLink, username]);
    return result.rows;
}

export async function createUser( username: string, email: string ) {
  const query = `INSERT INTO ${USER_TABLE} (email, username) VALUES (?, ?)`
  const result = await connection.execute(query, [email, username]);
  return result;
}
