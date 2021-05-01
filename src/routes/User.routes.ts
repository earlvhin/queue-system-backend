
/**
 * User Routes
 * Sample Route with Services
*/

import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/User.service';

const userRoutes: Router = Router(); 

userRoutes.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await new UserService().getAll())
});

userRoutes.get('/users_raw', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await new UserService().getAll_raw())
});

userRoutes.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await new UserService().getUserById(req.params.id))
})

export default userRoutes;