/**
 * Created by jhorak on 17.07.2017.
 */

import { Document, Schema, model } from 'mongoose';
import { IActivationToken } from '../interfaces/activation-token';
const randomToken = require('random-token');

export interface ActivationTokenModel extends IActivationToken, Document {}

export const ActivationTokenSchema = new Schema({
    userId: {type: String, unique: true },
    token: String
});

export const ActivationToken = model<ActivationTokenModel>('ActivationToken', ActivationTokenSchema);

export function activationTokenFactory(): string{
    // @TODO token should be unique
    return randomToken(80);
}
