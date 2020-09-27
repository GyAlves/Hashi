import { getCustomRepository } from 'typeorm';
import FoodRepository from '../repositories/foodRepository';

import Food from '../models/Food';
import AppError from '../errors/AppError';

interface CreateFood {
  title: string;
  description: string;
  type: 'japanese' | 'beverage';
  value: number;
  quantity: number;
  restaurant_id: string;
}

class CreateFoodService {
  public async execute({
    title,
    description,
    type,
    value,
    quantity,
    restaurant_id,
  }: CreateFood): Promise<Food> {
    const foodsRepository = getCustomRepository(FoodRepository);

    const foodExists = await foodsRepository.findOne({ where: { title } });

    if (foodExists) {
      throw new AppError('This food already exists');
    }

    const food = foodsRepository.create({
      title,
      description,
      type,
      value,
      quantity,
      restaurant_id,
    });

    await foodsRepository.save(food);
    return food;
  }
}

export default CreateFoodService;
