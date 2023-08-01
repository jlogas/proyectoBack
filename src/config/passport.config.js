import passport from "passport"
import local from "passport-local"
import userModel from "../dao/models/user.js"
import { createHash, isValidPassword } from "../utils.js"
import { logger } from "../utils/logger.js"

const localStrategy = local.Strategy

 const initializePassport = () => {

    passport.use("register", new localStrategy(
        {passReqToCallback: true, usernameField: "email"}, async(req, username, password, done) => {
            const { first_name, last_name, email,age,rol } = req.body
            try {
                let user = await userModel.findOne({ email: username})
                if(user) {
                    logger.warning("El usuario ya existe(passport.config)")
                    return done(null, false)
                }
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    rol
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch(err) {
                return done("Error al obtener el usuario" + error)
            } 
        }
    ))
    
    passport.use("login", new localStrategy(
        {usernameField: "email"} ,async(username, password, done) => {
            try {
            const user = await userModel.findOne({email: username})
            if(!user) {
                logger.warning("El usuario no existe")
                done(null, false)
            }
            if(!isValidPassword(user, password)) return done(null, false)
            done(null, user)
            } catch(err) {
                return done(err)
            }
        }   
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    
    passport.deserializeUser(async(id, done) => {
        const user = userModel.findById(id)
        done(null, user)
    });


    
} 

export const authorization = (rol) =>  {
    return (req, res, next) => {
      console.log('midelware',req.session.user.rol)
      console.log('midelware',req.user.rol)

      if (req.isAuthenticated() && req.session.user.rol === rol) {
        
        return next();
        
      } else {
        return res.send("Acceso denegado");
      }
    };
}

export default initializePassport