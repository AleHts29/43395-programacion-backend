import express from 'express';


// declaramos express
const app = express();
const PORT = 8080;


// Middleware para poder usar los req.query
app.use(express.urlencoded({ extended: true }));

// endpoint - nuetra API
app.get('/saludo', (req, res) => {
    res.send("<h1>Hola desde el backend usando Express!!</h1>")
})


// EJERCICO _ 01
const user = [{
    name: 'Juan',
    age: 30,
    address: {
        city: 'New York',
        state: 'NY'
    }
}];
app.get('/bienvenida', (req, res) => {
    res.send("<span style='color:green'>Hola! Te doy la bienvenida</span>");
});

app.get('/usuario', (req, res) => {
    res.send(user)
});



/*=============================================
=               Usando req.params             =
=============================================*/

app.get('/usuario2/:nombre/:apellido', (req, res) => {
    console.log(req.params);

    res.send(`Hola, tu nombre completo es: ${req.params.nombre} ${req.params.apellido}`)
})


/**
 * Ejemplo en vivo: Usando arreglos y request params
 */
const usuarios = [
    { id: 1, nomnbre: "Juan", apellido: "Torres", edad: "X", genero: "M" },
    { id: 2, nomnbre: "Carlos", apellido: "Garcia", edad: "20", genero: "M" },
    { id: 3, nomnbre: "Maria", apellido: "Torres", edad: "15", genero: "F" },
    { id: 4, nomnbre: "Patricia", apellido: "Ramirez", edad: "30", genero: "F" }
];


// ruta raiz
app.get('/', (req, res) => {
    res.send(usuarios);
})

app.get('/:userId', (req, res) => {
    let { userId } = req.params;
    console.log(typeof (req.params.userId))

    // hacemos la busqueda
    const usuario = usuarios.find(u => u.id === parseInt(userId));
    if (usuario) {
        res.json({ usuario })
    }


    res.send({ mensage: 'Usuario no encontrado!!' });
})







/*=============================================
=         Usando req.query                 =
=============================================*/

const consultas = []
// http://localhost:8080/ejemploQueries/query?nombre=Eli&apellido=Cafiero&edad=38
app.get('/ejemploQueries/query', (request, response) => {
    let datos = request.query;
    // console.log(datos);

    // let { nombre, apellido, edad } = request.query;
    // console.log(nombre, apellido, edad);

    consultas.push(datos)
    response.send(datos);
});

app.get('/ejemploQueries/query/all', (req, res) => {
    res.send(consultas)
})

app.get('/usuarios/query', (request, response) => {
    let { genero } = request.query;
    if (genero) {
        response.send(usuarios.filter(u => u.genero === genero));
    }
    response.send(usuarios);
});







// confi puerto de escucha
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})