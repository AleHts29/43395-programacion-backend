const http = require('http');


// creamos el server
const server = http.createServer((request, response) => {
    response.end("Mi primer hola mundo desde el server con modulo nativo HTTP!!! - Actualizo usando NODEMON")
})


// abrimos el puerto de escucha
server.listen(8090, () => {
    console.log(`Server run on port: 8080`);
})