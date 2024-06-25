import {
  IsValidEmail,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';

export class LoginAdminReqDto {
  @IsValidText()
  email: string;

  @IsValidText()
  password: string;
}

export class GetListAdminReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;
}

export class CreateAdminReqDto {
  @IsValidText()
  name: string;

  @IsValidEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class UpdateAdminReqDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  password?: string;
}

export class UpdateMyPasswordAdminReqDto {
  @IsValidText({ required: false })
  oldPassword?: string;

  @IsValidText({ required: false })
  newPassword?: string;
}
