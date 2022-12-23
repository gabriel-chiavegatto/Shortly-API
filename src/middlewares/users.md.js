import joi from 'joi';
import { connectionDB } from '../database/database.js';

export async function validateNewUser(req, res, next) {
    try {
        const user = req.body;

        const userSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            confirmPassword: joi.string().required()
        });
        const { error } = userSchema.validate(user, { abortEarly: false })
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors)
        }
        if (user.password != user.confirmPassword) { return res.status(422).send("Unconfirmed password") }

        const userExists = await connectionDB.query(`
        SELECT * FROM users WHERE email = $1
        `, [user.email]);
        if (userExists.rowCount != 0) {return res.sendStatus(409) }

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }


}