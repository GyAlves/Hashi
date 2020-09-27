// import multer from 'multer';

import { getCustomRepository } from 'typeorm';
import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/restaurantRepository';
// import uploadConfig from '../config/upload';

const usersRouter = Router();
// const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UserRepository);

  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, phone, isRestaurantOwner } = request.body;

    const createRestaurant = new CreateUserService();

    const user = await createRestaurant.execute({
      name,
      email,
      password,
      phone,
      isRestaurantOwner,
    });
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// usersRouter.patch(
//   '/images',
//   upload.single('image'),
//   async (request, response) => {
//     return response.json({ ok: true });
//   },
// );

export default usersRouter;
