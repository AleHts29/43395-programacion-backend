import mongoose from 'mongoose';

const userCollection = 'usuarios';


// definimos el schema 
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'Correo es requerido']
    }
})


// Definimos el modelo
export const userModel = mongoose.model(userCollection, userSchema);