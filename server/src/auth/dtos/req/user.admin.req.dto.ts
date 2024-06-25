import {
  IsValidBoolean,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';

export class GetListUserAdminReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidBoolean({ required: false })
  isBlock?: boolean;
}
