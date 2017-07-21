/**
 * Created by jhorak on 18.07.2017.
 */

import { User, UserModel } from '../schemas/user.schema';
import { ActivationToken } from '../schemas/activation-token.schema'

export function dataSchemasFactoriesFactory(dataType){
    switch(dataType){
        case "User":
            return (parsedJSONdata: UserModel)=>{return new User(parsedJSONdata)};
        case "ActivationToken":
            return (ActivationTokenData)=>{return new ActivationToken(ActivationTokenData)};
        default:
            return undefined;
    }
}