import { Expose } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import {
  ColumnBool,
  ColumnDate,
  ColumnFloat,
  ColumnInt,
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { File } from 'src/file/entities/file.entity';
import { Province } from 'src/province/entities/province.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PostGender } from '../enums/post.enum';
import { PostImage } from './post-image.entity';
import { PostReaction } from './post-reaction.entity';
import { SavedPost } from './saved-post.entity';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class Post extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString()
  address: string;

  @ColumnString()
  title: string;

  @ColumnString({ type: 'text', length: undefined })
  desc: string;

  @ColumnFloat()
  price: number;

  @ColumnFloat()
  area: number;

  @ColumnString({ nullable: true })
  gender: PostGender;

  @ColumnDate({ nullable: true })
  expiresAt: Date;

  @ColumnBool({ default: false })
  isBlock: boolean;

  // join province
  @ColumnInt()
  provinceId: number;

  @ManyToOne(() => Province, { persistence: false })
  @JoinColumn()
  province: Province;
  // end join province

  // join district
  @ColumnInt()
  districtId: number;

  @ManyToOne(() => Province, { persistence: false })
  @JoinColumn()
  district: Province;
  // end join district

  // join ward
  @ColumnInt()
  wardId: number;

  @ManyToOne(() => Province, { persistence: false })
  @JoinColumn()
  ward: Province;
  // end join ward

  // join user
  @ColumnInt()
  userId: number;

  @ManyToOne(() => User, (u) => u.posts, { persistence: false })
  @JoinColumn()
  user: User;
  // end join user

  // join category
  @ColumnInt()
  categoryId: number;

  @ManyToOne(() => Category, { persistence: false })
  @JoinColumn()
  category: Category;
  // end join category

  // join video
  @ColumnInt({ nullable: true })
  videoId: number;

  @ManyToOne(() => File, { persistence: false })
  @JoinColumn()
  video: File;
  // end join video

  @OneToMany(() => PostReaction, (pr) => pr.post, { persistence: false })
  postReactions: PostReaction[];

  @OneToMany(() => SavedPost, (sv) => sv.post, { persistence: false })
  savedPosts: SavedPost[];

  @OneToMany(() => PostImage, (pi) => pi.post, { persistence: false })
  postImages: PostImage[];
}
