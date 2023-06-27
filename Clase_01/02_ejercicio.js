// Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.
// Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola. Finalizar el proceso devolviendo la longitud de la lista (Utilizar template strings)
// Invocar la función con los casos de prueba.

function mostrarLista(array) {
    for (const element of array) {
        console.log(element);
    }

    if (array.length === 0) {
        console.log("Lista vacia");
    }

    return `Tamaño de la lista: ${array.length}`
}

let array = [1, 2, 3, 5, 13, 20]

// prueba lista vacia 
let resultado1 = mostrarLista([]);
console.log(resultado1);


// prueba con datos en lista
let resultado2 = mostrarLista(array);
console.log(resultado2);
