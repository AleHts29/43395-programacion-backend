import { Command } from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del server', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    .option('-u <user>', 'Usuario que va utilizar la app', "No se declaro ningun usuario")
program.parse() //Parsea los comandos y valida si son correctos.

// console.log("Options: ", program.opts());
// console.log("Modo Opt: ", program.opts().mode);
// console.log("Puerto Opt: ", program.opts().p);

console.log("Argumentos Opt: ", program.args);


// 2do - Listeners
process.on("exit", code => {
    console.log("Este codigo se ejecuta antes de salir del proceso.");
    console.log("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
    console.log("Esta exception no fue capturada, o controlada.");
    console.log(`Exception no capturada: ${exception}`)
});

process.on("message", message => {
    console.log("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
    console.log(`Mensaje recibido: ${message}`);
});



export default program;