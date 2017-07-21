import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as session from 'express-session';

// ---------------------- // ROUTERS // ---------------------------//
import { RecipesRouter } from './routes/recipers.router';
import { UserRouter } from './routes/users.router';
import { ActivationTokenRouter } from './routes/activation-token.router';


// --------------------// DATA // ------------------- //
import { BasicDataService } from './services/basic-data.service';
import { User } from './schemas/user.schema'

// ------------------ // SERVER START // ----------------------- //
const app = express();
const port = process.env.PORT || 8080;
const DB_URL = 'mongodb://localhost/myapp';

const UserDataService = new BasicDataService('User', User);

//---------- login methods ------------//


passport.use(new Strategy(
    function(username, password, cb) {

        // UserDataService.find();
        // db.users.findByUsername(username, function(err, user) {
        //     if (err) { return cb(err));; }
        //     if (!user) { return cb(null, false); }
        //     if (user.password != password) { return cb(null, false); }
        //     return cb(null, user);
        // }
    }));


// app.post('/login',
//     passport.authenticate('local'),
//     function(req, res) {
//         res.redirect('/');
//     });

// -----------  -------------- //
app.use(bodyParser.json());

app.get('/hello', (req, res)=>{
    res.writeHead(200);
    res.send();
});

mongoose.connect(DB_URL);

app.use('/recipe', RecipesRouter);
app.use('/user', UserRouter);
app.use('/activation-token', ActivationTokenRouter);




app.listen(port, function () {
    console.log('Node-cookbook app listening on port ' + port)
});


