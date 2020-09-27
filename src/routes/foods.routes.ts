import multer from 'multer';

import { getCustomRepository } from 'typeorm';
import { Router } from 'express';

import uploadConfig from '../config/upload';

import CreateFoodService from '../services/CreateFoodService';
import FoodRepository from '../repositories/foodRepository';

const foodsRouter = Router();
const upload = multer(uploadConfig);

foodsRouter.get('/', async (request, response) => {
  const foodsRepository = getCustomRepository(FoodRepository);

  const foods = await foodsRepository.find();

  return response.json(foods);
});

foodsRouter.post('/', async (request, response) => {
  try {
    const {
      title,
      description,
      type,
      value,
      quantity,
      restaurant_id,
    } = request.body;

    const createFood = new CreateFoodService();

    const food = await createFood.execute({
      title,
      description,
      type,
      value,
      quantity,
      restaurant_id,
    });

    return response.json(food);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

foodsRouter.patch(
  '/images',
  upload.single('image'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);
export default foodsRouter;
