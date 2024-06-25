import {
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';

export class GetListPostReactionAdminReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidNumber({ required: false })
  userId?: number;
}
