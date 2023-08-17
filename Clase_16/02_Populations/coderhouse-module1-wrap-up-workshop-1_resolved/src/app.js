import express from 'express';
import __dirname from './util.js';
import handlebars from 'express-handlebars';

import mongoose from 'mongoose';
import studentRouter from './routes/students.router.js'
import coursesRouter from './routes/courses.router.js'
import viewsRouter from "./routes/views.router.js";
import studentsModel from './services/db/models/students.js';
import { coursesModel } from './services/db/models/courses.js';

//Declarando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Template engine
 */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

//Declaración de Routers:
app.use('/', viewsRouter);
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);

const SERVER_PORT = 9091;
app.listen(9091, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/colegio_C16?retryWrites=true&w=majority');
        console.log("Conectado con exito a MongoDB usando Moongose.");

        /*=============================================
       =                   Population                =
       =============================================*/

        // // 1ro creamos al estudiante
        // let nuevoEstudiante = await studentsModel.create({
        //     name: "Luis",
        //     lastName: "Munar",
        //     age: "20",
        // });
        // let student = await studentsModel.findOne({ _id: nuevoEstudiante._id })
        // console.log(student);
        // ID: 64dd759aaa7cc86d90545a2c



        // // 2do creamos un nuevo curso
        // let nuevoCurso = await coursesModel.create(
        //     {
        //         title: "Curso Java",
        //         description: "Curso backend de Java",
        //         teacherName: "Juan Torres"
        //     }
        // );
        // let cursoNuevo = await coursesModel.findOne({ _id: nuevoCurso._id });
        // console.log(cursoNuevo);
        // // ID: 64dd760f7f1c803c99747540


        // // 3ro creamos la relacion
        // let student = await studentsModel.findOne({ _id: "64dd759aaa7cc86d90545a2c" })
        // console.log(JSON.stringify(student, null, '\t'));
        // student.courses.push({ course: "64dd760f7f1c803c99747540" });
        // console.log(JSON.stringify(student, null, '\t'));

        // // Actualizamos la data en la DB
        // let result = await studentsModel.updateOne(student);
        // console.log(result);




        // 4to añadimos el populate (si utilizo el middleware en el modelo no hace falta referanciarlo aqui).
        let student = await studentsModel.findOne({ _id: "64dd759aaa7cc86d90545a2c" })
        console.log(JSON.stringify(student, null, '\t'));


    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();