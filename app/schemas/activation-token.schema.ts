/**
 * Created by jhorak on 17.07.2017.
 */

import { Document, Schema, model } from 'mongoose';
import { IActivationToken } from '../interfaces/activation-token';
import { schemaParamsValidatorFactory } from '../services/schema-validators.factory'
export interface ActivationTokenModel extends IActivationToken, Document {}
const randomToken = require('random-token');

export const ActivationTokenSchema = new Schema({
    userId: String,
    token: String
});

export const ActivationToken = model<ActivationTokenModel>('ActivationToken', ActivationTokenSchema);

export const activationTokenValidator = schemaParamsValidatorFactory(ActivationTokenSchema);

export function activationTokenFactory(): string{
    return randomToken(80);
}
