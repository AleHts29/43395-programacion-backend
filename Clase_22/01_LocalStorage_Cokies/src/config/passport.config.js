import passport from 'passport';
import userModel from '../models/user.model.js';
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../utils.js';

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
    //Estrategia de obtener Token JWT por Cookie:
    passport.use('jwt', new JwtStrategy(
        // extraer la  cookie


        // Ambiente Async

    ));


    //Funciones de Serializacion y Desserializacion

};


// Funcion para hacer la extraccion de la cookie


export default initializePassport;
