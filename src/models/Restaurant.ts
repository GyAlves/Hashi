import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Food from './Food';
import User from './User';

@Entity('restaurants')
class Restaurant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('uuid')
  owner_id: string;

  @ManyToOne(() => User, user => user.restaurants)
  @JoinColumn({ name: 'owner_id' })
  users: User;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  CEP: number;

  @Column('decimal')
  deliveryTax: number;

  @OneToMany(() => Food, food => food.restaurant, { eager: true })
  foods: Food;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Restaurant;
