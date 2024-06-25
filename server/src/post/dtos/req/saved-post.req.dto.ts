import {
  IsValidEnum,
  IsValidNumber,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';
import { PostReactionType } from 'src/post/enums/post-reaction.enum';

export class GetListSavedPostReqDto extends PaginationReqDto {}
