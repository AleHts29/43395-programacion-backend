import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';


// TODO: Implementacion passport
// declaracion de estrategia
const localStrategy = passportLocal.Strategy

const initializePassport = () => {

    // Register
    passport.use('register', new localStrategy(
        // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
        // usernameField: renombramos el username
        { passReqToCallback: true, usernameField: 'email' },

        async (req, username, password, done) => {
            // Logica que teniamos en session.router
            const { first_name, last_name, email, age } = req.body;
            try {
                const exists = await userModel.findOne({ email })
                if (exists) {
                    return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                const result = await userModel.create(user);

                // si esta todo ok
                return done(null, result)

            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }

        }
    ));


    // Login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false)
                }
                // Validacion de el password
                if (!isValidPassword(user, password)) {
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ));



    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });

}



export default initializePassport;
