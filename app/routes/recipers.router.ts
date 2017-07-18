/**
 * Created by jhorak on 17.07.2017.
 */
import { Router } from 'express';

export const RecipesRouter = Router();

RecipesRouter.get('/', function (req, res){
    res.send('First recipe recived!');
});