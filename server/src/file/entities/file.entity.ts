import { Expose } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import {
  ColumnInt,
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class File extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString()
  url: string;

  @ColumnString()
  publicId: string;

  // join user
  @ColumnInt()
  userId: number;

  @ManyToOne(() => User, (u) => u.files, { persistence: false })
  @JoinColumn()
  user: User;
  // end join user
}
