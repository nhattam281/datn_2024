import { Expose } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import {
  ColumnInt,
  ColumnPrimaryGenerated,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
@Index(['userId', 'postId'], { unique: true })
export class SavedPost extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  // join user
  @ColumnInt()
  userId: number;

  @ManyToOne(() => User, (u) => u.postReactions, { persistence: false })
  @JoinColumn()
  user: User;
  // end join user

  // join post
  @ColumnInt()
  postId: number;

  @ManyToOne(() => Post, (p) => p.savedPosts, { persistence: false })
  @JoinColumn()
  post: Post;
  // end join post
}
