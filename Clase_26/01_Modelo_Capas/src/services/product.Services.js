const { recuperarDatos, guardarDato, deleById } = require('../models/productData.js')

const obtenerDatos = async () => {
    // Logica
    return await recuperarDatos();
}


const crearDato = async () => {
    // logica
    dato.id = Math.random();
    await guardarDato(dato);
    return dato;
}

const deleteServices = async (id) => {
    // logica
    return await deleById(id);
}

module.exports = {
    obtenerDatos,
    crearDato,
    deleteServices
}