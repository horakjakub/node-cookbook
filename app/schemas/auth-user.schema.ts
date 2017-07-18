/**
 * Created by jhorak on 17.07.2017.
 */

import * as mongoose from 'mongoose';

const authUserSchema = new mongoose.Schema({
    userName: {type: String, index: {unique: true}},
    password: String,
    role: String,
});

export const AuthUser = mongoose.model('AuthUser', authUserSchema);
