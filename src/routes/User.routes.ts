
/**
 * User Routes
 * Sample Route with Services
*/

import { Router, Request, Response, NextFunction } from 'express';
import { getUserById, getAllUsers, getAllUsers_raw } from '../services/User.service';

const userRoutes: Router = Router(); 

userRoutes.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getAllUsers())
});

userRoutes.get('/users_raw', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getAllUsers_raw())
});

userRoutes.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getUserById(req.params.id))
})

export default userRoutes;