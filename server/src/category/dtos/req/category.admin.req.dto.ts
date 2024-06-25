import { IsValidText } from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';

export class GetListCategoryAdminReqDto extends PaginationReqDto {
  @IsValidText({required: false})
  searchText?: string
}

export class SaveCategoryAdminReqDto {
  @IsValidText()
  name: string;

  @IsValidText({ maxLength: 999999 })
  desc: string;
}
