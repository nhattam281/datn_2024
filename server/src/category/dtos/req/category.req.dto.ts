import { IsValidText } from 'src/common/decorators/custom-validator.decorator';

export class GetListCategoryReqDto {
  @IsValidText({ required: false })
  searchText?: string;
}
