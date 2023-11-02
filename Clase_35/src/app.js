import express from 'express';
import config from './config/config.js';
import performanceRouter from './routers/performance-test.router.js'


import cluster from 'cluster';
// Numero de CPU
import { cpus } from 'os';


import { addLogger } from './config/logger.js';
// console.log("Preguntar si es el cluster primario");
// console.log(cluster.isPrimary);
// if (cluster.isPrimary) {
//     const numeroProcesadores = cpus().length
//     console.log("Soy proceso primario y voy delegar el trabajo a un fork.");
//     console.log("Numero de CPUs en mi maquina: ");
//     console.log(cpus().length);

//     for (let i = 0; i < numeroProcesadores - 1; i++) {
//         cluster.fork(); // esto es para crear workers
//     }
// } else {
//     // Soy worker
//     console.log('Soy un worker!!');
// }


console.log(`Es cluster primario? : ${cluster.isPrimary}`);
if (cluster.isPrimary) {
    console.log("Identificamos el ProcessId Padre: " + process.pid);
    const numeroProcesadores = cpus().length;

    console.log(`NumeroProcesadores en esta maquina: ${numeroProcesadores}`);
    console.log("Proceso primario, generando Fork para un trabajador.");
    for (let i = 0; i < numeroProcesadores - 1; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Crea un nuevo worker para reemplazar al que murió
        cluster.fork();
    })

} else {
    console.log("Este es un proceso Fork! Soy un worker!!");
    console.log(`Soy un proceso worker con el id: ${process.pid}`);

    const app = express();

    app.use(addLogger);


    app.get("/", (req, res) => {
        res.send({ status: "success", message: `Peticion atendida por el worker: ${process.pid}` });
    });


    app.use("/api/performance", performanceRouter);


    const SERVER_PORT = config.port;
    app.listen(SERVER_PORT, () => {
        console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
    })
}
