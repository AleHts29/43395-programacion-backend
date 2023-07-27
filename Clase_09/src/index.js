import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import usersRoutes from './routes/views.router.js'

const app = express();
const PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Para trabajar con archivos estaticos
// app.use('/static', express.static('./src/public'))
app.use(express.static(__dirname + '/public'))


// Configuracion de .hbs
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars');



// app.get('/', (req, res) => {
//     // usuario de prueba
//     let testUser = {
//         name: 'Santiago',
//         last_name: 'Kosacoff',
//         edad: 26
//     }
//     res.render('hello', testUser);
// })



app.use('/', usersRoutes);



app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})