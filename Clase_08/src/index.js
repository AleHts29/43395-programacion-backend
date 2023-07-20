import express from 'express';
import usersRoutes from './routes/users.routes.js'
import petsRoutes from './routes/pets.routes.js'
import __dirname from './utils.js';


const app = express();
const PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Para trabajar con archivos estaticos
// app.use('/static', express.static('./src/public'))
app.use(express.static(__dirname + '/public'))


// middleware
app.use(function (request, response, next) {
    console.log("Mi propio middleware a nivel de APLICACION Principal!");
    console.log("Time: " + Date().toLocaleString());
    next();
});



app.use('/api/user', usersRoutes);
app.use('/api/pet', petsRoutes);




app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
    console.log(__dirname);
})