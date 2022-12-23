import joi from 'joi';
import { connectionDB } from '../database/database.js';

export async function uriValidate(req, res, next) {
    try {
        const { url } = req.body;

        const schemaUrl = joi.string().uri().required();
        const { error } = schemaUrl.validate(url);
        if (error) { return res.status(422).send(error.details) }

        res.locals.url = url;
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }
}

export async function userUriValidation(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = res.locals;

        const link = await connectionDB.query(`
            SELECT user_id
            FROM links
            WHERE id = $1;
        `, [id]);

        const urlUserId = link.rows[0].user_id;

        if (urlUserId != userId) { return res.sendStatus(401) }

        next()

    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }
}