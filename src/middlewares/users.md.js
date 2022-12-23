import joi from 'joi';
import { connectionDB } from '../database/database.js';

export async function validateNewUser(req, res, next) {
    try {
        const user = req.body;

        const userSchema = joi.object({
            name: joi.string(),
            email: joi.email().required(),
            password: joi.password().required(),
            confirmPassword: joi.password().required()
        });
        const { error } = userSchema.validate(user, { abortEarly: false })
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors)
        }

        const userExists = await connectionDB.query(`
        SELECT * FROM users WHERE email = $1
        `, [email]);
        if (userExists) { return res.sendStatus(409) }

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }


}