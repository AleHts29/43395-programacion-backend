// SetTimeout

const temporizador = (callback) => {
    setTimeout(() => {
        callback();
        console.log("Tarea Finalizada!!");
    }, 5000)
}

let operacion = () => console.log("Realizando operacion con setTimeout!!");

// console.log("Iniciando tarea con timeout!");
// temporizador(operacion);


// setInterval
let contador = () => {
    let contador = 1;

    let timer = setInterval(() => {
        console.log(contador++);
        if (contador > 7) {
            clearInterval(timer)
        }
    }, 1000)
}

contador();

