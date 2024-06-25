import { Expose } from 'class-transformer';
import {
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class Category extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString()
  name: string;

  @ColumnString({ type: 'text', length: undefined, nullable: true })
  desc: string;
}
