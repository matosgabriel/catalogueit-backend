import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}

export default Item;
