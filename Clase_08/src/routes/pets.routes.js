import { Router } from "express";
import { uploader } from "../utils.js";
import miDirName from "../utils.js" // por defecto exporta __dirname





const router = Router();

let pets = [];


// middleware a nivel de router
router.use(function (request, response, next) {
    console.log("Mi propio middleware a nivel de ROUTER!!.");
    console.log("Time: " + Date().toLocaleString());
    next();
});


router.get('/', (request, response) => {
    console.log("Consumiendo api GET /api/users..");
    console.log("Usuarios actuales: ");
    console.log(pets);
    response.send(pets);
});

router.post('/', (request, response) => {
    let pet = request.body;
    pet.id = Math.floor(Math.random() * 20 + 1);
    if (!pet.nombre || !pet.especie) {
        console.error("Mascota no es valida.");
        console.error(pet);
        response.status(400).send({ status: "Error", message: "Mascota invalida, verifique los datos de entrada." });
    } else {
        pets.push(pet);
        console.log(pets);
        response.send({ status: "Success", message: `Mascota agregada con exito, con ID: ${pet.id}` });
    }
});




/*=============================================
=                   Section_02                =
=============================================*/


// Aplicando Middleware
function miMiddleware(request, response, next) {
    console.log("llama a mi middleware..");
    next();
};

/**
 * Metodo GET por default:
 */
router.get('/middleware', miMiddleware, (request, response) => {
    console.log("Consumiendo api GET /api/pets..");
    console.log("Mascotas actuales: ");
    console.log(pets);
    response.send(pets);
});




/*=============================================
=                   Section_03                =
=============================================*/
// Usando Multer
router.post("/profile", uploader.array('file'), (request, response) => {
    if (!request.files) {
        return response.status(400).send({ status: "error", mensaje: "No se adjunto archivo." });
    }
    console.log(request.files);

    // Persistimos una mascota con su foto
    let pet = request.body;
    pet.id = Math.floor(Math.random() * 20 + 1);
    pet.image = request.files[0].path;
    if (!pet.nombre || !pet.especie) {
        console.error("Mascota no es valida.");
        console.error(pet);
        response.status(400).send({ status: "Error", message: "Mascota invalida, verifique los datos de entrada." });
    } else {
        pets.push(pet);
        console.log(pets);
        response.send({ status: "Success", message: `Mascota agregada con exito, con ID: ${pet.id}` });
    }

    // response.send("pets");
});





export default router;