import { Expose } from 'class-transformer';
import {
  ColumnInt,
  ColumnPrimaryGenerated,
  ColumnString,
} from 'src/common/decorators/typeorm.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PostReactionType } from '../enums/post-reaction.enum';
import { User } from 'src/auth/entities/user.entity';
import { Post } from './post.entity';

@Entity({ orderBy: { id: 'DESC' } })
@Expose()
@Index(['type', 'userId', 'postId'], { unique: true })
export class PostReaction extends BaseEntity {
  @ColumnPrimaryGenerated()
  id: number;

  @ColumnString()
  type: PostReactionType;

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

  @ManyToOne(() => Post, (p) => p.postReactions, { persistence: false })
  @JoinColumn()
  post: Post;
  // end join post
}
