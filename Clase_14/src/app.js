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
const DB = 'mongodb+srv://c43395:<password></password>@cluster0.lgoy2ny.mongodb.net/clase14?retryWrites=true&w=majority'
const connectMongoDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB();