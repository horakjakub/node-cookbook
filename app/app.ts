/**
 * Created by jhorak on 17.07.2017.
 */

import * as express from 'express';

const app = express();

app.get('/hello', (req, res)=>{
    res.writeHead(200);
    res.send();
});

app.listen(3000, function () {
    console.log('Node-cookbook app listening on port 3000!')
});
