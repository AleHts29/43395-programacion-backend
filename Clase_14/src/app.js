import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routers/users.router.js'

const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SERVER_PORT = 9090;


//Declaración de Routers:
app.use("/api/users", usersRouter);


app.listen(9090, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});


// Declaramos temas de conccion con la DB 


