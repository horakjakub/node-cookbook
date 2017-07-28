/**
 * Created by jhorak on 17.07.2017.
 */

import { Router } from 'express';
import * as createError from "http-errors";

import { BasicRouterHelper } from '../services/basic-router-helper';
import { BasicDataService } from '../services/basic-data.service';
import { User, userParamsValidator } from '../schemas/user.schema';
import { ActivationToken, activationTokenFactory }from '../schemas/activation-token.schema';
import { Mail, sendMail } from '../services/mail.service';

export const UserRouter = Router();
export const UserRouterHelper = new BasicRouterHelper(userParamsValidator);

const userDataService = new BasicDataService("User", User);
const activationTokenDataService = new BasicDataService("ActivationToken", ActivationToken);
const severUrl = process.env.SERVER_URL || "http://localhost:8080/";

UserRouter.put('/', function (req, res, next){
    userDataService.create(req.body, createTokenAndSendEmailConfirmationMail(res, next));
});

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

UserRouter.get('/', function (req, res, next){
    let params = UserRouterHelper.returnValidatedParams(req, next);

    if(params !== null){
        userDataService.find({[params.key]: params.value }, UserRouterHelper.handleResults(res, next));
    } else {
        userDataService.list(UserRouterHelper.handleResults(res, next));
    }
});

UserRouter.post('/', function (req, res, next){
    let params = UserRouterHelper.returnValidatedParams(req, next);
    userDataService.update({[params.key]: params.value }, req.body, UserRouterHelper.handleResults(res, next));
});

UserRouter.delete('/', function (req, res, next){
    let params = UserRouterHelper.returnValidatedParams(req, next);
    userDataService.remove({[params.key]: params.value }, UserRouterHelper.handleResults(res, next));
});




