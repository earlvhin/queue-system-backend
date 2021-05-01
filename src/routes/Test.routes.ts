/**
 * Test Route
*/

import { Router, Request, Response, NextFunction } from 'express';

const testRoute: Router = Router(); 

testRoute.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
        message: 'pong'
    })
})

export default testRoute;