
/**
 * User Routes
 * Sample Route with Services
*/

import { Router, Request, Response, NextFunction } from 'express';
import { CarService } from '../services/Car.service';

const carRoutes: Router = Router(); 

carRoutes.get('/cars', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await new CarService().getAll())
});

carRoutes.get('/cars_raw', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await new CarService().getAll_raw())
});

carRoutes.get('/cars/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await new CarService().getUserById(req.params.id))
})

export default carRoutes;