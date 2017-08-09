import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import * as session from 'express-session';
import * as url from "url";
import * as createError from "http-errors";
import * as cors from "cors";
const Hawk = require('hawk');

// ---------------------- // ROUTERS // ---------------------------//
import { RecipesCollectionRouter } from './routes/recipes-collection.router';
import { UserRouter } from './routes/users.router';
import { ActivationTokenRouter } from './routes/activation-token.router';
import { LoginRouter } from './routes/login.router';

// --------------------// DATA // ------------------- //
import { BasicDataService } from './services/basic-data.service';
import { ReactiveDataService } from './services/reactive-data.service';
import { User } from './schemas/user.schema'
import { AuthUser } from './schemas/auth-user.schema'

// ------------------ // SERVER START // ----------------------- //
const app = express();
const port = process.env.PORT || 8080;
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost/myapp';
const UserDataService = new ReactiveDataService('User', User);
const AuthUserDataService = new BasicDataService('AuthUser', AuthUser);

mongoose.connect(DB_URL);

//---------- MIDDLEWARE ------------//

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(checkKeyAuthentication);


//---------- auth methods ------------//

const ACCESS_KEY = process.env.ACCESS_KEY || 'OLD4W4gLcxViydpgK0vRZJo8LaetrQDHTSfkVPrTi8okZfTMv6wmFsjHaxeLypwBrBq7Pmr0mefzaRw';

function checkKeyAuthentication(req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(params.key === ACCESS_KEY){
        next();
    } else if('token' in params && req.url.indexOf('/activation-token') === 0){
        next();
    } else {
        res.writeHead(401);
        res.end('Bad access key')
    }
}

passport.use(new BasicStrategy(
    function(email, password, done) {
        UserDataService.find({email: email, password: password},
            function(error, user){
                if (error) {
                    console.log(error);
                    return done(error);
                } else {
                    if (!user) {
                        console.log('unknown user');
                        return done(error);
                    } else {
                        console.log(user.email + ' authenticated successfully');
                        return done(null, user);
                    }
                }
            });
    })
);

function checkIsUserIsActive(req, res, next){
    let userId: string = req.user._id;
    UserDataService.find({ _id: userId },
        (error,user)=>{
            if(!error){
                if(user.active){
                    next();
                } else {
                    next(createError(406, 'User unactive'));
                }
            } else {
                next(createError(400, error.message ))
            }
        })
}

// ----------- backend connection check ------------ //

app.get('/hello',
   (req, res)=>{
    res.writeHead(200);
    res.end();
});

// ----------- routes ------------ //

app.use('/recipesCollection',
        passport.authenticate('basic', { session: false }),
        checkIsUserIsActive,
        RecipesCollectionRouter
    );

app.use('/user',
        UserRouter
    );

app.use('/activation-token', ActivationTokenRouter);

app.get('/login',
    passport.authenticate('basic', { session: false }),
    checkIsUserIsActive,
    (req, res)=>{
        res.writeHead(200);
        res.end();
    });

app.listen(port, function () {
    console.log('Node-cookbook app listening on port ' + port)
});

