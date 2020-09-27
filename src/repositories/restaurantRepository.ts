import { EntityRepository, Repository } from 'typeorm';

import Restaurant from '../models/Restaurant';

interface RestaurantDTO {
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

@EntityRepository(Restaurant)
class RestaurantRepository extends Repository<Restaurant> {}

export default RestaurantRepository;
