import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import User from '../models/User';

interface AuthenticateUserDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Incorrect password/email combination', 401);
    }

    const comparedPassword = await compare(password, user.password);

    if (!comparedPassword) {
      throw new AppError('Incorrect password/email combination', 401);
    }

    const token = sign({}, 'gojapanese2020', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
