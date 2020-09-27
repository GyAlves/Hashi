import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { password, email } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      password,
      email,
    });
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
