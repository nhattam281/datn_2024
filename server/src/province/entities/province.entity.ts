import { Expose } from 'class-transformer';
import {
  ColumnInt,
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProvinceType } from '../enums/province.enum';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class Province extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString()
  name: string;

  @ColumnString({ nullable: false })
  code: string;

  @ColumnString()
  type: ProvinceType;

  // join parent
  @ColumnInt({ nullable: true })
  parentId: number;

  @ManyToOne(() => Province, (p) => p.children, { persistence: false })
  @JoinColumn()
  parent: Province;
  // join parents

  @OneToMany(() => Province, (p) => p.parent, { persistence: false })
  children: Province[];
}
