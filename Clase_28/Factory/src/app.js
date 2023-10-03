import express from 'express';
import __dirname from './util.js';
import config from './config/config.js';

//Routers a importar:
import studentRouter from './routes/students.router.js'
import coursesRouter from './routes/courses.router.js'

// Declaramos Express
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Declaramos rutas
app.use('/api/students', studentRouter)
app.use('/api/courses', coursesRouter)



app.listen(config.port, () => {
    console.log("Servidor escuchando por el puerto: " + config.port);
});