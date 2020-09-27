import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserRepository from '../repositories/userRepository';

import User from '../models/User';
import AppError from '../errors/AppError';

interface CreateUser {
  name: string;
  email: string;
  password: string;
  phone: number;
  isRestaurantOwner: boolean;
}

class CreateFoodService {
  public async execute({
    name,
    email,
    password,
    phone,
    isRestaurantOwner,
  }: CreateUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('E-mail already in use ');
    }

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      isRestaurantOwner,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateFoodService;
