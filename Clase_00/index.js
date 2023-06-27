const nombre = "Ana"
nombre = "Juan"
// console.log(nombre);



const numero = 12;
let numero2 = nombre;

// numero2 = 33

// console.log(typeof (numero));


// numero = true

const obj1 = {
    nombre: "Tomas",
    apellido: "Torres"
}
console.log(typeof (obj1));


let obj2 = { ...obj1 }
obj2.apellido = 'Brocos'
obj2.city = "CABA"
console.log(obj2);

console.log(obj1);




const array = [1, 2, "Ana", true]
array.push(1)
// // obj.nombre = "Diana" // esto esta OK
console.log(typeof (array));

// esto no se puede hacer
const obj = {
    nombre: "Tomas",
    apellido: "Torres"
}

obj = {
    nombre: "Diana",
    apellido: "Torres"
}
console.log(obj);


// console.log(typeof (array));