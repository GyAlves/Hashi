import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

interface UserDTO {
  name: string;
  email: string;
  password: string;
  phone: number;
  isRestaurantOwner: boolean;
}

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
