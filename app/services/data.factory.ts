/**
 * Created by jhorak on 18.07.2017.
 */

import { User } from '../schemas/user.schema';

export function prepareSchemaDataFromJson(dataType){
    switch(dataType){
        case "User":
            return (JSONdata) =>{ return new User(JSONdata) } ;
        default:
            return undefined;
    }
}