import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/view.router.js'
import { Server } from 'socket.io'

const app = express();
const PORT = process.env.PORT || 8080;

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

let messages = []
// Abrimos el canal de comunicacion
socketServer.on('connection', socket => {

    socket.on('message', data => {
        messages.push(data);

        // enviamos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
        // socket.emit('messageLogs', messages) // esto no es funcional para este ejercicio

        // socket.broadcast.emit('messageLogs', messages);

        socketServer.emit('messageLogs', messages);
    })

    socket.on('userConnected', data => {
        socket.broadcast.emit('userConnected', data.user);
    })

    // socket.disconnect()
    socket.on('closeChat', data => {
        if (data.close === 'close')
            socket.disconnect();
    })

})


