/**
 * Created by jhorak on 21.07.2017.
 */

import { Router } from 'express';


export const LoginRouter = Router();

// --------------------- // HAWK // ---------------------- //

// const credentialsFunc = function (id, callback) {
//
//     const credentials = {
//         key: '89c70fa9d4bc8f7d2fe8151705f80a68a2e916e0964f39cf29cffd609db8425f',
//         algorithm: 'sha256',
//         userId: 'Steve',
//         expirationDate: ''
//     };
//
//     return callback(null, credentials);
// };
//
//
// function hawkAuthentication(req, res, next) {
//     Hawk.server.authenticate(req, credentialsFunc, {}, (err, credentials, artifacts) => {
//         if(err === null){
//             next();
//         }
//         debugger;
//     });
// };
//
// app.get('/hawk',
//     hawkAuthentication,
//     (res, req)=>{ debugger; }
// );