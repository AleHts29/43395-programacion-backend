import BusinessService from "../services/dao/business.dao.js";

const businessService = new BusinessService()


export const getBusiness = async (req, res) => {
    try {
        const businesses = await businessService.getAll();
        res.send({ message: "Success!", payload: businesses });
    } catch (error) {
        console.error("Hubo un problema conectandose a la persistencia de business.");
        res.status(500).send({ error: error });
    }
}

export const saveBusiness = async (req, res) => {
    try {
        const business = req.body;
        const result = await businessService.save(business);
        res.status(201).send({ message: "Success!", payload: result });
    } catch (error) {
        console.error("Hubo un problema creando el business.");
        res.status(500).send({ error: error });
    }
}

export const getBusinessesByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        console.log(category);
        const result = await businessService.getBusinessesByCategory(category);
        console.log(result);
        res.status(200).send({ message: "Success!", payload: result });
    } catch (error) {
        console.error("Hubo un problema creando el business.");
        res.status(500).send({ error: error });
    }
}

export const getBusinessById = async (req, res) => {
    res.send({ message: "Success!", payload: "getBusinesById: Por implementar" });
}