import { Exclude, Expose } from 'class-transformer';
import {
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { File } from 'src/file/entities/file.entity';
import { PostReaction } from 'src/post/entities/post-reaction.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, OneToMany } from 'typeorm';
import { AdminRole } from '../enums/admin.enum';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class Admin extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString({ unique: true })
  email: string;

  @ColumnString()
  @Exclude()
  password: string;

  @ColumnString()
  name: string;

  @ColumnString({ default: AdminRole.ADMIN })
  role: AdminRole;
}
