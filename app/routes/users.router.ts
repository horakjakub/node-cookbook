/**
 * Created by jhorak on 17.07.2017.
 */

import { Router } from 'express';
import * as url from "url";
import * as createError from "http-errors";

import { BasicDataService } from '../services/basic-data.service';
import { User, userParamsValidator } from '../schemas/user.schema';
import { ActivationToken, activationTokenFactory }from '../schemas/activation-token.schema';
import { Mail, sendMail } from '../services/mail.service';

export const UserRouter = Router();

const userDataService = new BasicDataService("User", User);
const activationTokenDataService = new BasicDataService("ActivationToken", ActivationToken);
const severUrl = "http://localhost:8080/";


function resultHandlerClosureWithResponse(res, next){
    return function resultHandler(error, result){
        if(error){
            next(createError(400, error.message))
        } else {
            res.send(result);
        }
    };
}


UserRouter.put('/', function (req, res, next){
    userDataService.create(req.body, createTokenAndSendEmailConfirmationMail(res, next));

    function createTokenAndSendEmailConfirmationMail(res, next){
        return function handleResult(error, result): void {
            if(error){
                next(createError(400, error.message))
            } else {
                let userDataJSON = JSON.parse(JSON.stringify(result));
                let newTokenData = { userId: userDataJSON._id, token: activationTokenFactory() };

                activationTokenDataService.create(newTokenData,(error, result)=>{
                    if(error){
                        next(createError(400, error.message))
                    } else {
                        sendConfirmationEmail(userDataJSON.email, result.token)
                        res.send(result);
                    }
                })
            }
        }
    }

    function sendConfirmationEmail(email: string, confirmationToken: string):void {
        let confirmEmailMessage = new Mail([ { Email: email } ], `<strong>To confirm your email adress, click <a href="${severUrl}activation-token?token=${confirmationToken}">here</a></strong>`, 'Please confirm your email address');

        sendMail(confirmEmailMessage,
            (success)=>{ console.log(success) },
            (err)=>{ console.log(err)}
        );
    }
});

UserRouter.get('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && userParamsValidator(paramsKeys)){
        userDataService.find({[paramsKeys[0]]: params[paramsKeys[0]]}, resultHandlerClosureWithResponse(res, next));
    } else if (paramsKeys.length === 0){
        userDataService.list(resultHandlerClosureWithResponse(res, next));
    } else {
        next(createError(400, 'Please provide valid parameters.'));
    }
});


UserRouter.post('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && userParamsValidator(paramsKeys)){
        userDataService.update({[paramsKeys[0]]: params[paramsKeys[0]]}, req.body, resultHandlerClosureWithResponse(res, next));
    } else {
        next(createError(400, 'Please provide valid parameters.'))
    }
});

UserRouter.delete('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && userParamsValidator(paramsKeys)){
        userDataService.remove({[paramsKeys[0]]: params[paramsKeys[0]]}, resultHandlerClosureWithResponse(res, next));
    } else {
        next(createError(400, 'Please provide valid parameters.'))
    }
});




