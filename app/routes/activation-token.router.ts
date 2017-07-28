/**
 * Created by jhorak on 17.07.2017.
 */
import { Router } from 'express';
import * as createError from "http-errors";

import { User } from '../schemas/user.schema';
import { BasicDataService } from '../services/basic-data.service';
import { ActivationToken, activationTokenParamsValidator }from '../schemas/activation-token.schema';
import { BasicRouterHelper } from '../services/basic-router-helper';

export const ActivationTokenRouter = Router();
export const ActivationTokenRouterHelper = new BasicRouterHelper(activationTokenParamsValidator);

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
            res.send('success');
        }
    }
}

ActivationTokenRouter.get('/', function (req, res, next){
    let params = ActivationTokenRouterHelper.returnValidatedParams(req, next);
    activationTokenDataService.findAndRemove({ [params.key]: params.value }, resultHandlerClosuredWithResponse(res, next));
});





