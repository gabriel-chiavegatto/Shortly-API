export async function signUp(req, res) {
    try {
        const user = res.locals.user;

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
}

export async function signIn(req, res) {
    try {

    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
}
