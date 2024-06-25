import {
  IsValidEmail,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';

export class RegisterAuthReqDto {
  @IsValidText()
  name: string;

  @IsValidEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class LoginAuthReqDto {
  @IsValidEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class ChangePasswordAuthReqDto {
  @IsValidText()
  oldPassword: string;

  @IsValidText()
  newPassword: string;
}
