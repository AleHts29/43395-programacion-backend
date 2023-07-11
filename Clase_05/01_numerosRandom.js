/** NodeJS **/
/**
 * Actividad en Clase:
    Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.
    Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave 
    será la cantidad de veces que salió dicho número. Representar por consola los resultados.
 */

// const numbers = [];
// const objNumber = {};

// for (let i = 0; i < 10000; i++) {
//     let number = Math.trunc(Math.random() * 21);
//     numbers.push(number);
// }

// for (let i = 1; i <= 20; i++) {
//     let cantidad = numbers.filter(n => n === i).length;
//     objNumber[i] = cantidad;
// }

// console.log(objNumber);


// 2da forma
const obj = {};

for (let i = 0; i < 10000; i++) {
    let randomNumber = Math.ceil(Math.random() * 20); // --> 1

    // condicion
    if (obj[randomNumber]) {
        obj[randomNumber]++;
    } else {
        obj[randomNumber] = 1;
    }

    // Forma conrta de escribir lo mismo
    // obj[randomNumber] ? obj[randomNumber]++ : obj[randomNumber] = 1
}

console.log(obj);