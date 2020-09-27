import { EntityRepository, Repository } from 'typeorm';

import Food from '../models/Food';

interface FoodDTO {
  title: string;
  type: string;
  value: string;
}

@EntityRepository(Food)
class FoodRepository extends Repository<Food> {}

export default FoodRepository;
