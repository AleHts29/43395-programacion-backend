import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';


// TODO: Implementacion passport

export default initializePassport;
