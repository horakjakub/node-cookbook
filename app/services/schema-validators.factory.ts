/**
 * Created by jhorak on 19.07.2017.
 */

import { Schema } from 'mongoose';
import { __ } from './lodash-extensions';

interface ISchemaParamsValidatorOptions {
    undesiredParams: string[];
}

export function schemaParamsValidatorFactory(schema: Schema, options?: ISchemaParamsValidatorOptions){
    let schemaParams: string[] = Object.keys(schema.obj);

    if(options){
        for(let option in options){
            switch(option){
                case "undesiredParams":
                    let undesiredParams = options[option];
                    schemaParams = __.filterStringArrayByStringArray(schemaParams, undesiredParams);
                    break;
                default:
                    break;
            }
        }
    }

    return function schemaParamsValidator(paramsToValidate: string[] | string): boolean {
        let isParamValid: boolean = false;

        if(typeof paramsToValidate !== 'string'){
            for(let i = 0; i < schemaParams.length; i++){
                if(paramsToValidate.filter((paramToValid)=> paramToValid === schemaParams[i]).length > 0){
                    isParamValid = true;
                    break;
                }
            }

        } else {
            for(let i = 0; i < schemaParams.length; i++){
                if(paramsToValidate === schemaParams[i]){
                    isParamValid = true;
                    break;
                }
            }
        }

        return isParamValid;
    }
}

