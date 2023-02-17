import {connect} from "@planetscale/database"
import { nanoid } from 'nanoid';

import { DATA_SOURCES } from "../config/vars.config";

const dataSource = DATA_SOURCES.mySqlDataSource
console.log("trying connection")
const connection = connect({
    host: 'ap-south.connect.psdb.cloud',
    username: 'sxgimhi9z9y6oqotr9v4',
    password: 'pscale_pw_mr65JL0THrkJ5vN0E7c4Yr2tRKo3eoK8sLesV0gYQxd',
})
console.log("connection was made")
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
    console.log()
    return result
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
