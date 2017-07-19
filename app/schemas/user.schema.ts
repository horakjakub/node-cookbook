/**
 * Created by jhorak on 17.07.2017.
 */

import { Document, Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user';
import { schemaParamsValidatorFactory } from '../services/schema-validators.factory'
export interface UserModel extends IUser, Document {}

export const UserSchema = new Schema({
    username: {type: String, unique: true },
    email: {type: String, unique: true },
    password: String,
    active: { type: Boolean, default: false }
});

export const User = model<UserModel>('User', UserSchema);

export const userParamsValidator = schemaParamsValidatorFactory(UserSchema, { undesiredParams: ['password', 'active']});


