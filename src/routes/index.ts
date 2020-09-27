import { Router } from 'express';

import foodsRouter from './foods.routes';
import restaurantsRouter from './restaurants.routes';
import sessionsRouter from './session.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/foods', foodsRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
