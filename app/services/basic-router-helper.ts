/**
 * Created by jhorak on 24.07.2017.
 */

import * as createError from "http-errors";
import * as url from "url";

export class BasicRouterHelper {
    paramsValidator: any;
    constructor(paramsValidator?){
        this.paramsValidator = paramsValidator;
    }

    handleResults(res, next){
        return function basicResultHandler(error, result){
            if(error){
                next(createError(400, error.message))
            } else {
                res.send(result);
            }
        };
    }

    checkIfErrorAndIfNotReturnResult(error, result){
    }

    returnValidatedParams(request, next){
        let params = url.parse(request.url, true).query;
        delete params.key;
        let paramsKeys = Object.keys(params);

        if(paramsKeys.length > 0 && paramsKeys.length < 2 &&
            (this.paramsValidator !== undefined && this.paramsValidator(paramsKeys))){
            return {key: paramsKeys[0], value: params[paramsKeys[0]]};
        }
        else if (paramsKeys.length === 0){
            return null
        }
        else {
            next(createError(400, 'Please provide valid parameters.'))
        }
    }
}