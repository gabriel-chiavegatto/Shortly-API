import { connectionDB } from "../database/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
    try {
        const { name, email, password } = res.locals.user;

        const passwordHash = bcrypt.hashSync(password, 10);

        await connectionDB.query(`
        INSERT INTO 
        users (name, email, password)
        VALUES ($1, $2, $3)
        `, [name, email, passwordHash]);

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}

export async function signIn(req, res) {
    try {
        const { user } = res.locals;


    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
}
