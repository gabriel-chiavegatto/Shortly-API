import { connectionDB } from "../database/database.js";
import { v4 as uuidV4 } from 'uuid';


export async function signUp(req, res) {
    try {
        const { name, email, password } = res.locals.user;

        await connectionDB.query(`
            INSERT INTO 
            users (name, email, password)
            VALUES ($1, $2, $3);
        `, [name, email, password]);

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}

export async function signIn(req, res) {
    try {
        const { userId } = res.locals;
        const token = uuidV4();

        await connectionDB.query(`
            INSERT INTO 
            auth_sessions (user_id, token)
            VALUES ( $1, $2);
        `, [userId, token])

        res.status(200).send(token)

    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}

export async function userLinks(req, res) {
    try {
        const { userId } = res.locals;
        let user = await connectionDB.query(`
        SELECT u.id, 
		        u.name, 
                SUM(l.views) as "visitCount"
            FROM links l  
        JOIN users u 
            ON l.user_id = u.id 
        WHERE u.id = $1
        GROUP BY u.id;
        `, [userId])
        if (user.rowCount === 0) { return res.sendStatus(404) }

        user = user.rows[0]

        const allLinks = await connectionDB.query(`
            SELECT id, short_url AS "shortUrl", url, views AS "visitCount"
            FROM links
            WHERE user_id = $1;
        `, [userId])
        if (allLinks.rowCount === 0) { return res.sendStatus(404) }

        const shortenedUrls = allLinks.rows;

        user = { ...user, shortenedUrls };

        res.status(200).send(user)

    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}