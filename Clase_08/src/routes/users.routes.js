import { Router } from 'express';


const router = Router();

let users = []
// Creamos los Endpoints

// GET
router.get("/", (req, res) => {
    res.send(users);
})




// POST
router.post('/', (req, res) => {
    let user = req.body
    console.log(user);

    // asignacion de ID
    const numRamdom = Math.floor(Math.random() * 20 + 1)
    user.id = numRamdom + users.length


    if (!user.first_name || !user.last_name) {
        return res.status(400).send({ status: "error", msg: "valores incompletos, revisar datos de entrada!!" })
    }
    users.push(user)
    res.send({ status: "success", msg: 'Usuario Creado!' })
})


/**
 * Metodo PUT de un usuario
 */
router.put('/:userId', (request, response) => {
    console.log("Consumiendo api PUT /api/user..");
    console.log(request.params);

    let userId = parseInt(request.params.userId);
    let userUpdated = request.body;

    console.log(`Buscando usuario a modificar por id: ${userId}`);
    const userPosition = users.findIndex((u => u.id === userId));
    if (userPosition < 0) {
        return response.status(202).send({ status: "info", error: "Usuario no encontrado" });
    }

    console.log("Usario encontrado para modificar:");
    console.log(users[userPosition]);
    userUpdated.id = users[userPosition].id;
    users[userPosition] = userUpdated;

    console.log("Usuarios actuales: ");
    console.log(users);

    return response.send({ status: "Success", message: "Usuario Actualizado.", data: users[userPosition] }); //Si no se indica retorna status HTTP 200OK.
});


// DELETE

/**
 * Metodo DELETE de un usuario
 */
router.delete('/:userId', (request, response) => {
    console.log("Consumiendo api DELETE /api/user..");
    console.log(request.params);
    let userId = parseInt(request.params.userId);
    console.log(`Buscando usuario a eliminar por id: ${userId}`);
    const usersSize = users.length;
    const userPosition = users.findIndex((u => u.id === userId));
    if (userPosition < 0) {
        return response.status(202).send({ status: "info", error: "Usuario no encontrado" });
    }
    console.log("Usario encontrado para eliminar:");
    console.log(users[userPosition]);
    users.splice(userPosition, 1);
    if (users.length === usersSize) {
        return response.status(500).send({ status: "error", error: "Usuario no se pudo borrar." });
    }
    return response.send({ status: "Success", message: "Usuario Eliminado." }); //Si no se indica retorna status HTTP 200OK.
});


export default router;
