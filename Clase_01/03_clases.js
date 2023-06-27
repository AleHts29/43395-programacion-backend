class Auto {
    // static #color;
    constructor(color, marca) {
        this.color = color;
        this.marca = marca;
    }


    // Metodos
    frenar() {
        return `se frena el auto`
    }

    acelerar() {
        return `se acelera el auto ${this.color}`
    }
}


// creamos instancias
const newAuto1 = new Auto('Negro', 'Peugeot');
const newAuto2 = new Auto('Azul', 'Ford');
const newAuto3 = new Auto('Amarillo', 'Tesla');


console.log(newAuto1);
console.log(newAuto1.acelerar());