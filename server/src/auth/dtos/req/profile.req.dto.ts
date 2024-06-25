import {
  IsValidText,
  IsValidUrl,
} from 'src/common/decorators/custom-validator.decorator';

export class UpdateProfileUserReqDto {
  @IsValidText()
  name: string;

  @IsValidUrl({ required: false })
  avatar?: string;

  @IsValidText({ required: false })
  zaloPhoneNumber?: string;

  @IsValidText({ required: false })
  phoneNumber?: string;

  @IsValidText({ required: false })
  facebook?: string;
}
