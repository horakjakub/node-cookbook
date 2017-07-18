/**
 * Created by jhorak on 17.07.2017.
 */
import { Router } from 'express';
import * as url from "url";

import { BasicDataService } from '../services/basic-data.service';
import { User } from '../schemas/user.schema';

export const UserRouter = Router();

let userDataService = new BasicDataService("User", User, { defaultSearchKey: "username" });

UserRouter.get('/', function (req, res){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && paramsKeys[0] !== 'password'){
        userDataService.find(res, paramsKeys[0], params[paramsKeys[0]]);
    } else if (paramsKeys.length > 1){ r
        userDataService.list(res);
    } else {

    }
});

UserRouter.put('/', function (req, res){
    userDataService.create(req.body, res);
});

UserRouter.post('/', function (req, res){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && paramsKeys[0] !== 'password'){
        userDataService.update(req.body, res, paramsKeys[0], params[paramsKeys[0]]);
    } else if (paramsKeys.length > 1){
        // this API supports only one parameter
    } else {
        userDataService.update(req.body, res);
    }
});

UserRouter.delete('/', function (req, res){
    let params = url.parse(req.url, true).query;
    let paramsKeys = Object.keys(params);

    if(paramsKeys.length > 0 && paramsKeys.length < 2 && paramsKeys[0] !== 'password'){
        userDataService.remove(res, paramsKeys[0], params[paramsKeys[0]]);
    } else if (paramsKeys.length > 1){ r
        // this API supports only one parameter
    } else {

    }
});




