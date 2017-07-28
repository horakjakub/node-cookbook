/**
 * Created by jhorak on 17.07.2017.
 */

import { Document, Schema, model } from 'mongoose';
import { IRecipeCollection } from '../interfaces/recipes-collection';

export interface RecipeCollectionModel extends IRecipeCollection, Document {
}

export const RecipesCollectionSchema = new Schema({
    userId: { type: String, unique: true },
    recipesId: [ String ]
});

export const RecipesCollection = model<RecipeCollectionModel>('RecipesCollection', RecipesCollectionSchema );
