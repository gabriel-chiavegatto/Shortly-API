import joi from 'joi';

export async function uriValidate(req, res,next) {
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