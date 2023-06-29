//ES9
//Spread and Rest Operator 
//Tomemos un objeto de ejemplo:
const persona = {
    nombre: 'Max',
    edad: 29,
    saludar() {
        console.log('Hola, Yo soy ' + this.nombre);
    }
};


//Y usemos un array de ejemplo:
const hobbiesOriginal = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];

//Copiando arrays
console.log("\n************** Copiando arrays: ************ \n");
const copiedSlicedArray = hobbiesOriginal.slice(1, 3);
const copiedNestedArray = [hobbiesOriginal];

// console.log(copiedSlicedArray);
// console.log(copiedNestedArray);


//Usando operador Spread:
// console.log("\n************** Spread operator: ************ \n");
// const copiedArrayWithSpread = [...hobbiesOriginal]
// console.log("copiedArrayWithSpread: ");
// console.log(copiedArrayWithSpread);
// // También nos sirve para copiar objetos:
// const personCopiedSpread = { ...persona };
// console.log("Persona copiada usando spread: ");
// console.log(personCopiedSpread);




//Rest Operator:
console.log("\n************** Rest operator: ************ \n");
//Depende como usemos el (...) operator se comporta como un spread or rest.
const toArray = (...args) => { //En este caso estamos usando el operador como argumento
    return args;               // por esto, los argumentos se unen y se constuye un array con los mismos.
}
console.log(toArray(1, 2, 3, 4));