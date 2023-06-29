//Ejemplo de Array.map()
//Syntax:
// Arrow function
// map((element) => { /* … */ })
// map((element, index) => { /* … */ })
// map((element, index, array) => { /* … */ })
const array = [1, 2, 3, 4, 5]
const numeros = array.map((num) => num * 2)
// const numeros2 = array.map((num) => {
//     return num * 2
// })
// console.log(numeros);


//ES7
//Uso de exponencial ** como remplazo de la funcion pow de la librería Math (Math.pow(base, exp)))
const valoresBase = [1, 2, 3, 4, 5, 6];

/** 
 * Toma un arreglo de valores base y con ayuda del operador map(), utiliza el operador exponencial para
 * elevar el valor base por su indice así: (1**0, 2**1, 3**2, 4**3, 5**4, 6**5) 
*/
let exponciales = valoresBase.map((base, indice) => base ** indice);
// console.log(exponciales);

let usuario1 = {
    nombre: 'Juan',
    productos: {
        nombre: 'Vino',
        precio: 123
    },

}

const productos = {
    nombre: 'Vino',
    precio: 123
}

//Array.includes: Corrobora si algún elemento existe en el arreglo:
let nombresArray = ['Juan', 'Camilo', 'Maria', 'Ana', 'Humberto', usuario1];

// console.log("Array Includes con arreglos!");
// const nombre = "Ana"
// if (nombresArray.includes(nombre)) { // el includes me retorna un booleano
//     console.log(`${nombre} - si existe dentro del array`);
// } else {
//     console.log(`${nombre} - No existe dentro del array`);
// }

// prueba con objetos dentro del array
if (nombresArray.includes(productos)) { // el includes me retorna un booleano
    console.log(`${obj1.nombre} ${obj1.precio}- si existe dentro del array`);
} else {
    console.log(`- No existe dentro del array`);
}