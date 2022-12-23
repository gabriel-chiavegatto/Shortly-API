import { connectionDB } from "../database/database.js";

export async function signUp(req, res) {
    try {
        const { name, email, password } = res.locals.user;

        await connectionDB.query(`
        INSERT INTO 
        users (name, email, password)
        VALUES ($1, $2, $3)
        `, [name, email, password]);

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}

export async function signIn(req, res) {
    try {

    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
}
