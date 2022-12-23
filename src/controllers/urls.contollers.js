import { connectionDB } from "../database/database.js";
import { nanoid } from "nanoid";

export async function shorten(req, res) {
    try {
        const { userId, url } = res.locals;
        const shortUrl = nanoid();

        await connectionDB.query(`
            INSERT INTO 
            links ( url, short_url, user_id )
            VALUES ( $1, $2, $3 );
        `, [url, shortUrl, userId])

        res.status(201).send({ shortUrl })
    } catch (error) {
        console.log(error);
        res.status(422).send(error.detail)
    }
}