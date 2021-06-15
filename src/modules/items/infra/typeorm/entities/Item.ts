import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import uploadConfig from '../../../../../config/upload';
import Category from '../../../../categories/infra/typeorm/entities/Category';

const { Bucket, region } = uploadConfig.config.s3;

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

  @Column()
  picture: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.items)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'picture_url' })
  getPictureUrl(): string | null {
    if (!this.picture) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.picture}`;
      case 's3':
        return `http://${Bucket}.s3.${region}.amazonaws.com/${this.picture}`;
      default:
        return null;
    }
  }
}

export default Item;
