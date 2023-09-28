import express from 'express';
import __dirname from './utils.js';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
// app.use(cors())

// Configura el middleware cors con opciones personalizadas
const corsOptions = {
    // Permitir solo solicitudes desde un cliente específico
    origin: 'http://127.0.0.1:5502',

    // Configura los métodos HTTP permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    // Configura las cabeceras permitidas
    allowedHeaders: 'Content-Type,Authorization',

    // Configura si se permiten cookies en las solicitudes
    credentials: true,
};
app.use(cors(corsOptions));





//Declare routers:
app.get('/test', (req, res) => {
    res.send({ message: "success", payload: "Success!!" });
});

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
    //DotEnv:
    //console.log(config);
});


const mongoInstance = async () => {
    try {
        await MongoSingleton.getIntance()
    } catch (error) {
        console.log(error);
    }
}
mongoInstance()



const mongoInstance2 = async () => {
    try {
        await MongoSingleton.getIntance()
    } catch (error) {
        console.log(error);
    }
}


// Sin singleton - conexion directa
// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(config.mongoUrl);
//         console.log("Conectado con exito a MongoDB usando Moongose en app.js");
//     } catch (error) {
//         console.error("No se pudo conectar a la BD usando Moongose: " + error);
//         process.exit();
//     }
// };
// connectMongoDB();
// connectMongoDB();