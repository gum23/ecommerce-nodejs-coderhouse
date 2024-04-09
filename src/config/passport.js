import passport from 'passport';
import LocalStrategy from 'passport-local';
import github from 'passport-github2';
import usersModel from '../dao/db/models/usersModel.js';
import userManager from '../dao/mongo.classes/userManager.js';
import CartsManagerMongo from '../dao/mongo.classes/CartsManagerMongo.js';
import CartsMongo from '../dao/mongo.classes/CartsMongo.js';
import moment from 'moment';
import { createHash, compareHashAndPass } from '../utils/bcrypt.util.js';

const cartsManagerMongo = new CartsManagerMongo();

export const initializePassport = () => {
    passport.use('register', new LocalStrategy.Strategy(
        {usernameField: "email", passReqToCallback: true},
        async (req, username, password, done) => {
            try {
                const rol = 'usuario';
                const userData = req.body;
                let user = await usersModel.findOne({email: username});
                if (user) {
                    done('Error, el usuario ya existe');
                }
                let passwordCrypt = await createHash(password);
                
                const dateNow = moment();
                const date = dateNow.format('YYYY-MM-DD');
                const newCar = new CartsMongo([]);
                const resCreateCart = await cartsManagerMongo.createCar(date, newCar);

                const idCart = resCreateCart._id;

                const newUser = new userManager(
                    userData.firstName,
                    userData.lastName,
                    userData.email,
                    userData.age,
                    passwordCrypt,
                    idCart,
                    rol
                );
                    
                const result = await usersModel.create(newUser);
                done(null, result)
            } catch (error) {
                return done("Error al crear usuario", error);
            }
        }
    ));

    passport.use('login', new LocalStrategy.Strategy(
        {usernameField: "email"},
        async(username, password, done) => {

            try {
                if (username == "adminCoder@coder.com" && password == "adminCod3r123") {
                    const admin = {rol: "Admin"};
                    return done(null, admin);
                }

                let user = await usersModel.findOne({email: username});
                if (!user) {
                    return done(null, false);
                }

                const comparePass = compareHashAndPass(password, user);
                if (comparePass == false) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done("Error al ingresar", error);
            }
        }
    ));

    passport.use('github', new github.Strategy(
        {
            clientID: "Iv1.a34fbf12c727d0bf",
            clientSecret: "4d42250f35bb8dd203422b9af16ab26992f0a35e",
            callbackURL: "http://localhost:8080/api/signIn/github"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let {name, email} = profile._json
                let user = await usersModel.findOne({email});
                if (!user) {
                    user = await usersModel.create({
                        firstName: name,
                        email: email,
                        rol: "usuario",
                        github: profile
                    });   
                }

                return done(null, user);
            } catch (error) {
                return done("Error al conectar con github", error)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

}
