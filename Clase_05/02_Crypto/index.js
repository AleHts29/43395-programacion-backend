const UserManager = require('./UserManagerCripto.js');
let userManager = new UserManager();

let persistirUsuario = async () => {
    try {
        await userManager.crearUsuario("Usuario1", "Apellido1", "username1", "unPasswordPlano");
        let usuarios = await userManager.consultarUsuarios();
        console.log(`Usuarios encontrados en User Manager: ${usuarios.length}`);
        console.log(usuarios);

        // simulamos un logeo
        const usernameX = "usernameX";
        const username1 = "username1";
        const password = "unPasswordPlano";

        await userManager.validarUsuario(usernameX, password) // no pasa el test
        await userManager.validarUsuario(username1, password) // si pasa el test

    } catch (error) {
        console.error('Error ejecutando la operacion!!')
    }
}

persistirUsuario();

// 2do ejemplo
let textoCifrado = userManager.encrypt("Hola Mundo!");
console.log("Cifrando texto: Hola mundo!");
console.log("Resultado: ");
console.log(textoCifrado);

console.log("Descifrando texto: " + textoCifrado);
let textoDescifrado = userManager.decrypt(textoCifrado);
console.log("Texto descifrado: ");
console.log(textoDescifrado);
