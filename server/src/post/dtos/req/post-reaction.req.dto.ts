import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';
import { PostReactionType } from 'src/post/enums/post-reaction.enum';

export class GetListReactedPostReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;
}

export class ReactPostReqDto {
  @IsValidNumber()
  postId: number;

  @IsValidEnum({ enum: PostReactionType })
  type: PostReactionType;
}
