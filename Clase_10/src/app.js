import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/view.router.js'
import { Server } from 'socket.io'

const app = express();
const PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Confi de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + "/public"));


const httpServer = app.listen(PORT, () => {
    console.log("Server run on port: " + PORT);
})

// delclaramos el router
app.use('/', viewRouter);


// Instanciamos socket.io
const socketServer = new Server(httpServer);

// Abrimos el canal de comunicacion
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!!");

    socket.on("mensajeKey", data => {
        console.log(data);
    })

    socket.emit('msg_02', "Mensaje desde el back!!")

    socket.broadcast.emit("evento_para_todos_excepto_socket_actual", "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!")


    socketServer.emit("evento_para_todos", "Evento para todos los Sockets!");

})


