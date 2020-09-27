import { getCustomRepository } from 'typeorm';

import Restaurant from '../models/Restaurant';
import RestaurantRepository from '../repositories/restaurantRepository';
import UserRepository from '../repositories/userRepository';
import AppError from '../errors/AppError';

interface CreateRestaurant {
  name: string;
  owner_id: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  CEP: number;
  deliveryTax: number;
}

class CreateRestaurantService {
  public async execute({
    name,
    owner_id,
    state,
    city,
    neighborhood,
    street,
    number,
    CEP,
    deliveryTax,
  }: CreateRestaurant): Promise<Restaurant> {
    const restaurantRepository = getCustomRepository(RestaurantRepository);
    const usersRepository = getCustomRepository(UserRepository);

    const restaurantsExists = await restaurantRepository.findOne({
      where: { name, CEP, number },
    });

    const userIsOwner = await usersRepository.findOne({ where: { owner_id } });

    if (restaurantsExists) {
      throw new AppError('This restaurant is already registered');
    }

    if (!userIsOwner?.isRestaurantOwner) {
      throw new AppError('This user can not own a restaurant ');
    }

    const restaurant = restaurantRepository.create({
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

    await restaurantRepository.save(restaurant);
    return restaurant;
  }
}

export default CreateRestaurantService;
