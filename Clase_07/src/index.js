import express from 'express';

const app = express();
const PORT = 9090;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('ruta principal')
})


// simulamos una DB
let users = [];


app.get('/usersAll', (req, res) => {
    res.send(users)
})


// queremos dar de alta info - CREAR
app.post('/api/users', (req, res) => {
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



// ACTUALIZAR
app.put('/api/users/:userId', (req, res) => {
    let userId = parseInt(req.params.userId)
    let userUpdated = req.body;


    const userPosition = users.findIndex((u => u.id === userId));

    if (userPosition < 0) {
        return response.status(202).send({ status: "info", error: "Usuario no encontrado" });
    }

    // aqui actualizamos
    users[userPosition] = userUpdated

    res.send({ status: "Success", message: "Usuario Actualizado.", data: users[userPosition] }); //Si no se indica retorna status HTTP 200OK.
})



// DELETE
app.delete('/api/users/:userId', (req, res) => {
    let userId = parseInt(req.params.userId);

    // tomamos el tamanio del array antes de elimanr el registro
    const usersSize = users.length;


    // buscamos el registro por el id
    const userPosition = users.findIndex((u => u.id === userId));
    if (userPosition < 0) {
        return response.status(202).send({ status: "info", error: "Usuario no encontrado" });
    }

    // Eliminamos el registro
    users.splice(userPosition, 1);
    if (users.length === usersSize) {
        return response.status(500).send({ status: "error", error: "Usuario no se pudo borrar." });
    }


    res.send({ status: "Success", message: "Usuario Eliminado." }); //Si no se indica retorna status HTTP 200 OK.

})





// ppuertos de escucha
app.listen(PORT, () => {
    console.log(`server port on: ${PORT}`)
})