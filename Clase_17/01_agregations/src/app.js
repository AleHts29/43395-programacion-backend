import express from 'express';
import __dirname from './util.js';
import mongoose from 'mongoose';
import * as dataOrders from './db/data.js'
import ordersModel from './models/orders.model.js';


//Declarando Express para usar sus funciones.
const app = express();


const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});


const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pizzeria?retryWrites=true&w=majority');
        // console.log(dataOrders.default);
        // let response = await ordersModel.insertMany(dataOrders.default)

        // let response = await ordersModel.insertMany({
        //     name: "Cheese", size: "extra-large", price: 12, quantity: 15, date: "2021-03-13T11:21:39.736Z"
        // })
        // console.log(response);


        let orders = await ordersModel.find();
        // console.log(orders);
        let size = "medium"
        orders = await ordersModel.aggregate([

            //Stage 1: Filtrar las ordenes por tamaño, en este caso solo pizzas medianas:
            {
                $match: { size: size }
            },

            //Stage 2: Agrupar por sabores y acumular el número de ejemplares de cada sabor:
            {
                $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
            },

            //Stage 3: Ordenar los documentos ya agrupados de mayor a menor.
            {
                $sort: { totalQuantity: -1 }
            },

            //Stage 4: Guardar todos los documentos generados de la agregacion en un nuevo documento 
            //         dentro de un arreglo. Para no dejarlos sueltos en la colección.
            //         $push indica que se guarda en un array, y $$ROOT inserta todo el documento.
            {
                $group: { _id: 1, orders: { $push: "$$ROOT" } }
            },


            // //Stage 5: Creamos nuestro pryecto a partir del array de datos.
            {
                $project: {
                    "_id": 1,
                    ordersSSS: "$orders"
                }
            },


            // // Stage Final - creamos colleccion
            {
                $merge: { into: "reports" }
            }
        ]
        )


        // output
        console.log(orders);


    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB();