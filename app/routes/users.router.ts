/**
 * Created by jhorak on 17.07.2017.
 */
import { Router } from 'express';
import * as url from "url";
import * as createError from "http-errors";

import { BasicDataService } from '../services/basic-data.service';
import { User, userParamsValidator } from '../schemas/user.schema';
import { ActivationToken }from '../schemas/activation-token.schema';
import { Mail, sendMail } from '../services/mail.service';


export const UserRouter = Router();

const userDataService = new BasicDataService("User", User, { defaultSearchKey: "username" });
const activationTokenDataService = new BasicDataService("ActivationToken", ActivationToken);

UserRouter.get('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && userParamsValidator(paramsKeys)){
        userDataService.find(res, paramsKeys[0], params[paramsKeys[0]]);
    } else if (paramsKeys.length === 0){
        userDataService.list(res);
    } else {
        next(createError(400, 'Please provide valid parameters.'));
    }
});

// --------------- // activation token // ------------- //

// let firstEmail = new Mail('First email', 'ThisIsSomeText', [{ Email: 'citizenkdick@gmail.com' }]);
// 1.user creation - add generate token, add create unactive user
// 2. add route with token checking
// 3. add user activation and token deleting

// 1. active user can login
//
// sendMail(firstEmail,
//     (succes)=>{ console.log(succes) },
//     (err)=>{ console.log(err)}
// );


UserRouter.put('/', function (req, res, next){
    userDataService.create(req.body, res);

    function someInterceptor(response){
        debugger;
        return response
    }
});

UserRouter.post('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && userParamsValidator(paramsKeys)){
        userDataService.update(req.body, res, paramsKeys[0], params[paramsKeys[0]]);
    } else if (paramsKeys.length === 0){
        userDataService.update(req.body, res);
    } else {
        next(createError(400, 'Please provide valid parameters.'))
    }
});

UserRouter.delete('/', function (req, res, next){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && userParamsValidator(paramsKeys)){
        userDataService.remove(res, paramsKeys[0], params[paramsKeys[0]]);
    } else {
        next(createError(400, 'Please provide valid parameters.'))
    }
});




