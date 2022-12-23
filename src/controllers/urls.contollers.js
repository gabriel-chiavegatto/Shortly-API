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

export async function renderShortedUrl(req, res) {
    try {
        const { id } = req.params;

        const link = await connectionDB.query(` 
            SELECT id, url, short_url 
            FROM links
            WHERE id = $1;
        `, [id]);

        if (link.rowCount === 0) { return res.sendStatus(404) }

        res.status(200).send(link.rows[0])

    } catch (error) {
        console.log(error);
        res.sendStatus(422)
    }
}

export async function redirectToUrl(req, res) {
    try {
        const { shortUrl } = req.params;

        const link = await connectionDB.query(`
            SELECT url
            FROM links
            WHERE short_url = $1;
        `, [shortUrl]);
        if (link.rowCount === 0) { return res.sendStatus(404) }

        await connectionDB.query(`
            UPDATE links 
            SET views = views + 1
            WHERE short_url = $1;
        `, [shortUrl]);

        res.redirect(302, link.rows[0].url)

    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}