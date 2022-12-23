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
            auth_sessions (user_id, token, valid)
            VALUES ( $1, $2, $3);
        `, [userId, token, true])

        res.status(200).send(token)

    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}
