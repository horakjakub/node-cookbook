import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { AuthUser } from './schemas/auth-user.schema';
import { RecipesRouter } from './routes/recipers.router';
import { UserRouter } from './routes/users.router';

const app = express();
const port = process.env.PORT || 8080;
const DB_URL = 'mongodb://localhost/myapp';

app.use(bodyParser.json());

app.get('/hello', (req, res)=>{
    res.writeHead(200);
    res.send();
});

mongoose.connect(DB_URL);

app.use('/recipes', RecipesRouter);
app.use('/user', UserRouter);

app.listen(port, function () {
    console.log('Node-cookbook app listening on port ' + port)
});
