import * as UserServices from "../services/usersServices.js";


export async function createUser(req, res) {
    try {
        const { body } = req;
        const response = await UserServices.createUser(body);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message);
    }
}