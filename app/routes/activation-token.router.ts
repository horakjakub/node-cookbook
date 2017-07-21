/**
 * Created by jhorak on 17.07.2017.
 */
import { Router } from 'express';
import * as url from "url";
import * as createError from "http-errors";

import { User } from '../schemas/user.schema';
import { BasicDataService } from '../services/basic-data.service';
import { ActivationToken }from '../schemas/activation-token.schema';

export const ActivationTokenRouter = Router();
const activationTokenDataService = new BasicDataService("ActivationToken", ActivationToken);
const userDataService = new BasicDataService("User", User);

function resultHandlerClosuredWithResponse(res, next){
    return function resultHandler(error, result){
        if(error){
            next(createError(400, error.message))
        } else {
            let removedActivationToken = JSON.parse(JSON.stringify(result));
            userDataService.update({ _id:removedActivationToken.userId}, { active: true }, resultCallback);
        }
    };

    function resultCallback(error, result){
        if(error){
            next(createError(400, result.message));
        } else {
            res.send('succes!');
        }
    }
}

ActivationTokenRouter.get('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && paramsKeys[0] === "token"){
        activationTokenDataService.findAndRemove({ [paramsKeys[0]]: params[paramsKeys[0]]}, resultHandlerClosuredWithResponse(res, next));
    } else {
        next(createError(400, 'Please provide valid parameters.'))
    }
});





