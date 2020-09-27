import multer from 'multer';

import { getCustomRepository } from 'typeorm';
import { Router } from 'express';

import CreateRestaurantService from '../services/CreateRestaurantService';
import RestaurantRepository from '../repositories/restaurantRepository';
import uploadConfig from '../config/upload';

const restaurantsRouter = Router();
const upload = multer(uploadConfig);

restaurantsRouter.get('/', async (request, response) => {
  const restaurantsRepository = getCustomRepository(RestaurantRepository);

  const restaurant = await restaurantsRepository.find();

  return response.json(restaurant);
});

restaurantsRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      owner_id,
      state,
      city,
      neighborhood,
      street,
      number,
      CEP,
      deliveryTax,
    } = request.body;

    const createRestaurant = new CreateRestaurantService();

    const restaurant = await createRestaurant.execute({
      name,
      owner_id,
      state,
      city,
      neighborhood,
      street,
      number,
      CEP,
      deliveryTax,
    });

    return response.json(restaurant);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

restaurantsRouter.patch(
  '/images',
  upload.single('image'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export default restaurantsRouter;
