/**
 * Created by jhorak on 17.07.2017.
 */

import { Document, Schema, model } from 'mongoose';
import { IRecipe } from '../interfaces/recipe';

export interface RecipeModel extends IRecipe, Document {
}

export const RecipeSchema = new Schema({
    label: {type: String, unique: true },
    ingredients: [ String ],
    imgUrl: String,
    url: String,
    calories: Number
});

export const Recipe = model<RecipeModel>('Recipe', RecipeSchema);
