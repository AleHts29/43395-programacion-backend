import { Router } from "express";
import PetsService from '../services/db/pets.service.js';

const router = Router();
const petsService = new PetsService();

router.get("/", async (req, res) => {
    try {
        const pets = await petsService.getAll();
        if (!pets) {
            res.status(202).json({ message: "No pets found: " });
        }
        res.json(pets);
    } catch (error) {
        console.error("Error consultando las mascotas");
        res.status(500).send({ error: "Error consultando las mascotas", message: error });
    }
});



router.post("/", async (req, res) => {
    const { name, type } = req.body;
    try {
        const result = await petsService.save({ name: name, type: type });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar la mascota." });
    }
});



router.get("/:word([a-zA-Z%C3%A1%C3%A9%20]+)", async (req, res) => {
    try {
        console.log("Mascota despues de la busqueda: ");
        // console.log(req.pet);
        // const pets = req.pet; //->con router.param
        const pets = await petsService.findByName(req.params.word); //->sin router.param
        if (!pets) {
            res.status(202).send({ message: "No pets found" });
            throw new Error('No pets found');
        }
        res.json(pets);
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
    }
});



router.put("/:word([a-zA-Z%C3%A1%C3%A9%20]+)", async (req, res) => {
    try {
        const result = await petsService.update({ _id: req.pet._id }, { isAdopted: true })
        res.status(201).send(result)
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
});



router.get("*", async (req, res) => {
    res.status(400).send("Cannot get that URL.");
});



router.param("word", async (req, res, next, name) => {
    console.log("Buscando nombre de mascota con valor: " + name);
    try {
        let result = await petsService.findByName(name);
        if (!result) {
            req.pet = null
            throw new Error("No pets found")
        } else {
            req.pet = result
        }
        next();
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
        res.status(500).send({ error: "Error:", message: error.message });
    }
});

export default router;





/**
*
* 

Cuantificadores:

+: Para limitar el número de coincidencias en una expresión regular, puedes utilizar cuantificadores específicos en lugar de "+" que indiquen un rango específico de repeticiones. Algunos cuantificadores comunes son:

*: Significa "cero o más veces". Puedes usarlo si deseas permitir ninguna aparición o varias apariciones del elemento.

?: Significa "cero o una vez". Úsalo si deseas permitir que el elemento aparezca opcionalmente una vez.

{n}: Significa "exactamente n veces". Especifica un número exacto de repeticiones que deseas encontrar.

{n, m}: Significa "entre n y m veces". Puedes especificar un rango de repeticiones permitidas.

Por ejemplo, si deseas encontrar una cadena que contenga exactamente tres letras minúsculas seguidas, podrías usar la expresión regular [a-z]{3}. Esto coincidirá con cadenas como "abc" pero no coincidirá con "a" ni con "abcd".

Si deseas permitir un rango de repeticiones, puedes hacerlo de la siguiente manera:

[a-z]{2,4} coincidirá con cadenas que contengan entre 2 y 4 letras minúsculas consecutivas, como "ab", "abc", o "abcd".

[0-9]{1,3} coincidirá con cadenas que contengan entre 1 y 3 dígitos, como "5", "123", o "9999".

Entonces, para limitar el número de coincidencias en tu expresión regular, simplemente ajusta los cuantificadores ({}, *, ?, etc.) según tus necesidades específicas de repeticiones.

*
*/