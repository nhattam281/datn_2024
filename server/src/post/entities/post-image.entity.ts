import { Expose } from 'class-transformer';
import {
  ColumnInt,
  ColumnPrimaryGenerated,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { File } from 'src/file/entities/file.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
export class PostImage extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  // join post
  @ColumnInt()
  postId: number;

  @ManyToOne(() => Post, (p) => p.postImages, { persistence: false })
  @JoinColumn()
  post: Post;
  // end join post

  // join image
  @ColumnInt()
  imageId: number;

  @ManyToOne(() => File, { persistence: false })
  @JoinColumn()
  image: File;
  // end join image
}
