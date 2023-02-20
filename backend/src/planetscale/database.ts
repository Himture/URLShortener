import { connect } from "@planetscale/database"
import { nanoid } from 'nanoid';

console.log("trying connection")
const connection = connect({
    host: 'ap-south.connect.psdb.cloud',
    username: 'ztdr8onhp0qt5yfxlkai',
    password: 'pscale_pw_Jx20m0XBDMZUMSKsRZNPz228KhY6Jc9lam4WQgcwdcB',
})
const USER_TABLE = "user"
const LINKS_TABLE = "links"

export async function createShortUrl(oLink: string, sLink: string, userId: number, tag: string) {
    try {
        console.log("it tried to create ")

        const result = await connection.execute(
            `INSERT INTO ${LINKS_TABLE} (oLink, sLink, userID, tag) VALUES (${oLink}, ${sLink}, ${userId}, ${tag});`);
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUrlByShortUrl(sLink: string) {
    const query = `SELECT oLink, sLink, userID, tag FROM ${LINKS_TABLE} WHERE sLink = ?;`
    const result = await connection.execute(query, [sLink])
    console.log(result.rows)
    return result.rows
}

export async function deleteShortUrlById(sLink: string) {
    const result = await connection.execute(`DELETE FROM ${LINKS_TABLE} WHERE sLink = ${sLink}`)
    console.log(result)
    return result
}

export async function getUserByEmail(email: String) {
    const result = await connection.execute(`SELECT name, email, uID, slinks FROM ${USER_TABLE} WHERE email = ${email}`)
    return result
}

export async function createUser(name: string, email: string, password: string) {

    const uID = nanoid(8);

    const result = await connection.execute(`INSERT INTO ${USER_TABLE} (name, email, uID) VALUES (${name}, ${email}, ${uID})`);
    return result
}
