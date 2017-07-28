/**
 * Created by jhorak on 17.07.2017.
 */
import { Router } from 'express';

import * as createError from "http-errors";
import { ReactiveDataService } from '../services/reactive-data.service';
import { BasicDataService } from '../services/basic-data.service'
import { Recipe, RecipeModel } from '../schemas/recipe.schema';
import { RecipesCollection, RecipeCollectionModel } from '../schemas/recipes-collection.schema';
import { User } from '../schemas/user.schema';

import { BasicRouterHelper } from "../services/basic-router-helper";
import {error} from "util";

export const RecipesCollectionRouter = Router();

const RecipesDataService = new ReactiveDataService('Recipe', Recipe);
const RecipesCollectionDataService = new BasicDataService('RecipesCollection', RecipesCollection);
const RecipesCollectionRouterHelper = new BasicRouterHelper();

RecipesCollectionRouter.get('/', function (req, res, next){
    let userId: string = req.user._id;
    let recipes: RecipeModel[] = [];

    RecipesCollectionDataService.find({ userId: userId },(err, result)=>{
        if(!err){
            RecipesDataService.findMany("_id", result.recipesId,
                (success)=>{ recipes.push(success) },
                (error)=>{
                    next(createError(400, error.message));
                },
                (complete)=>{
                    res.send(recipes)
                }
            )
        } else {
            next(createError(404, err.message));
        }
    });
});

RecipesCollectionRouter.post('/', function (req, res, next){
    let recipesIds: string[] = [];
    let userId: string = req.user._id;

    RecipesDataService.updateMany('label', req.body,
        (success)=>{
            recipesIds.push(‌‌success._id);
        },
        (error)=>{
            next(createError(400, error.message));
        },
        (complete)=>{
            RecipesCollectionDataService.update({ userId: userId },{ userId: userId, recipesId: recipesIds },
                (error, result)=>{
                    if(error){
                        next(createError(400, error.message));
                    } else {
                        res.send(result)
                    }
                })
        }
    );
});
