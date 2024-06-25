import {
  IsValidBoolean,
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';

export class GetListPostAdminReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidNumber({ required: false })
  userId?: number;

  @IsValidBoolean({ required: false })
  isBlock?: boolean;
}

export class GetRecommendedPostAdminReqDto {
  @IsValidNumber()
  amount: number;

  @IsValidNumber()
  userId: number;
}
