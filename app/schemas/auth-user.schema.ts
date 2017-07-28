/**
 * Created by jhorak on 17.07.2017.
 */

import { IAuthUser } from '../interfaces/auth-user';
import { Document, Schema, model } from 'mongoose';
export interface AuthUserModel extends IAuthUser, Document {}


const authUserSchema = new Schema({
    username: {type: String, index: {unique: true}},
    password: String,
    role: String,
});

export const AuthUser = model<AuthUserModel>('AuthUser', authUserSchema);
