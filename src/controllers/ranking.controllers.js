import { connectionDB } from "../database/database.js";

export async function ranking(req,res) {
    try {
        let rating = await connectionDB.query(`
            SELECT u.id, 
                    u.name,
                    COUNT(*) as "linksCount",
                    SUM(l.views) as "visitCount"
                FROM links l  
            JOIN users u 
                ON l.user_id = u.id 
            GROUP BY u.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `)
        res.status(200).send(rating.rows)

    } catch (error) {
        console.log(error);
        res.sendStatus(422)
    }
}