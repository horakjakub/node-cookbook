/**
 * Created by jhorak on 18.07.2017.
 */

import { User, UserModel } from '../schemas/user.schema';
import { ActivationToken, ActivationTokenModel } from '../schemas/activation-token.schema';
import { Recipe, RecipeModel } from '../schemas/recipe.schema';
import { RecipesCollection, RecipeCollectionModel } from '../schemas/recipes-collection.schema';
import { AuthUser } from '../schemas/auth-user.schema'

export function dataSchemasFactoriesFactory(dataType){
    switch(dataType){
        case "User":
            return (parsedJSONdata: UserModel)=>{return new User(parsedJSONdata)};
        case "ActivationToken":
            return (ActivationTokenData: ActivationTokenModel)=>{return new ActivationToken(ActivationTokenData)};
        case "Recipe":
            return (RecipeData: RecipeModel)=>{return new Recipe(RecipeData)};
        case "RecipesCollection":
            return (RecipesCollectionData: RecipeCollectionModel)=>{return new RecipesCollection(RecipesCollectionData)};
        case "AuthUser":
            return (RecipesCollectionData: RecipeCollectionModel)=>{return new RecipesCollection(RecipesCollectionData)};
        default:
            return undefined;
    }
}