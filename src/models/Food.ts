import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Restaurant from './Restaurant';

@Entity('foods')
class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  type: 'japanese' | 'beverage';

  @Column('decimal')
  value: number;

  @Column('integer')
  quantity: number;

  @Column('uuid')
  restaurant_id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.foods)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Food;
