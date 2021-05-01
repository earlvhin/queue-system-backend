
/**
 * Car Routes
 * Sample Route with Services
*/

import { Router, Request, Response, NextFunction } from 'express';
import { getAllCars, getAllCars_raw, getCarById } from '../services/Car.service';

const carRoutes: Router = Router(); 

carRoutes.get('/cars', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getAllCars())
});

carRoutes.get('/cars_raw', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getAllCars_raw())
});

carRoutes.get('/cars/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getCarById(req.params.id))
})

export default carRoutes;