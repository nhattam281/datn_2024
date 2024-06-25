import { Exclude, Expose } from 'class-transformer';
import {
  ColumnBool,
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { File } from 'src/file/entities/file.entity';
import { PostReaction } from 'src/post/entities/post-reaction.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class User extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString({ unique: true })
  email: string;

  @ColumnString()
  @Exclude()
  password: string;

  @ColumnString({ nullable: true, unique: true })
  phoneNumber: string;

  @ColumnString({ nullable: true })
  avatar: string;

  @ColumnString()
  name: string;

  @ColumnBool({ default: false })
  isBlock: boolean;

  @ColumnString({ nullable: true })
  zaloPhoneNumber: string;

  @ColumnString({ nullable: true })
  facebook: string;

  @OneToMany(() => Post, (p) => p.user, { persistence: false })
  posts: Post[];

  @OneToMany(() => File, (p) => p.user, { persistence: false })
  files: File[];

  @OneToMany(() => PostReaction, (pr) => pr.user, { persistence: false })
  postReactions: PostReaction[];
}
