import { ApiProperty } from '@nestjs/swagger';
import { boolean } from 'boolean';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinDate,
  MinLength,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { IsURLOptions, UUIDVersion } from 'validator';
import { isNullOrUndefined } from '../helpers/utility.helper';

type ValidationEnumOptions<E, T> = {
  enum: E;
  required?: boolean;
  default?: T;
};
export function IsValidEnum<E extends object, T>(
  opts: ValidationEnumOptions<E, T>,
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    const { required = true } = opts;
    IsEnum(opts.enum)(target, propertyKey);
    if (opts.default)
      Transform(({ value }) =>
        isNullOrUndefined(value) ? opts.default : value,
      )(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate Number is valid
 */
type ValidationDateOptions = {
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

export function IsValidDate(
  { required = true, maxDate, minDate }: ValidationDateOptions = {
    required: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string): void {
    Type(() => Date)(target, propertyKey);
    if (minDate) MinDate(minDate)(target, propertyKey);
    if (maxDate) MaxDate(maxDate)(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate Number is valid
 */
type ValidationNumberOptions = {
  required?: boolean;
  min?: number;
  max?: number;
};
export function IsValidNumber(
  { required = true, min, max }: ValidationNumberOptions = {
    required: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsNumber({})(target, propertyKey);
    Type(() => Number)(target, propertyKey);
    if (typeof min === 'number') Min(min)(target, propertyKey);
    if (typeof max === 'number') Max(max)(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);

    ApiProperty({ minimum: min, maximum: max })(target, propertyKey);
  };
}

/**
 * Validate Number string is valid
 */
type ValidationNumberStringOptions = {
  required?: boolean;
  maxLength?: number;
};

export function IsValidNumberString(
  { required = true, maxLength }: ValidationNumberStringOptions = {
    required: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsNumberString({})(target, propertyKey);
    if (maxLength) MaxLength(maxLength)(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);

    ApiProperty({ maxLength })(target, propertyKey);
  };
}

/**
 * Validate text is valid
 */
type ValidationTextOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  matches?: RegExp;
  trim?: boolean;
};

export function IsValidText(
  {
    minLength = 1,
    maxLength = 255,
    required = true,
    matches,
    trim = true,
  }: ValidationTextOptions = {
    required: true,
    minLength: 1,
    maxLength: 255,
    trim: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string): void {
    IsString()(target, propertyKey);
    MaxLength(maxLength)(target, propertyKey);
    if (trim) {
      Transform(({ value }: { value: string }) => value?.trim?.())(
        target,
        propertyKey,
      );
    }
    if (matches) Matches(matches)(target, propertyKey);
    if (required) {
      MinLength(minLength)(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else IsOptional()(target, propertyKey);

    ApiProperty({ maxLength, minLength })(target, propertyKey);
  };
}

/**
 * Validate hex color
 */
type ValidationHexColorOptions = { required?: boolean };
export function IsValidHexColor(
  { required = true }: ValidationHexColorOptions = { required: true },
): PropertyDecorator {
  return function (target: any, propertyKey: string): void {
    IsHexColor()(target, propertyKey);
    if (required) {
      IsNotEmpty()(target, propertyKey);
    } else IsOptional()(target, propertyKey);
    ApiProperty({ pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$' })(target, propertyKey);
  };
}

/**
 * Validate uuid is valid
 */
type ValidationUUIDOptions = {
  required?: boolean;
  version?: UUIDVersion;
};

export function IsValidUUID(
  { required = true, version = '4' }: ValidationUUIDOptions = {
    required: true,
    version: '4',
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsUUID(version)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
  };
}

/**
 * Validate object is valid
 */
type ValidationObjectOptions = {
  required?: boolean;
  object?: { new (...args: any[]): any };
};

export function IsValidObject(
  { object, required = true }: ValidationObjectOptions = {
    required: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    ValidateNested()(target, propertyKey);
    if (typeof object === 'function') Type(() => object)(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Valid array of number
 */
type ValidationArrayOptions<T = any> = {
  required?: boolean;
  minSize?: number;
  maxSize?: number;
  unique?: boolean;
  minValue?: number;
  maxValue?: number;
  defaults?: T[];
};
export function IsValidArray(
  {
    required = true,
    minSize,
    maxSize,
    unique,
    maxValue,
    minValue,
  }: ValidationArrayOptions = {
    required: true,
    unique: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (typeof minValue === 'number')
      Min(minValue, { each: true })(target, propertyKey);
    if (typeof maxValue === 'number')
      Max(maxValue, { each: true })(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);

    ApiProperty({
      minItems: minSize,
      maxItems: maxSize,
      minimum: minValue,
      maximum: maxValue,
    })(target, propertyKey);
  };
}

export function IsValidArrayNumber(
  {
    required = true,
    minSize,
    maxSize,
    unique,
    maxValue,
    minValue,
  }: ValidationArrayOptions = {
    required: true,
    unique: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsNumber({}, { each: true })(target, propertyKey);
    Transform(({ value }) =>
      Array.isArray(value)
        ? value.map(Number)
        : isNullOrUndefined(value)
          ? []
          : [Number(value)],
    )(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (typeof minValue === 'number')
      Min(minValue, { each: true })(target, propertyKey);
    if (typeof maxValue === 'number')
      Max(maxValue, { each: true })(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
    ApiProperty({
      minItems: minSize,
      maxItems: maxSize,
      minimum: minValue,
      maximum: maxValue,
    })(target, propertyKey);
  };
}

export function IsValidArrayString(
  { required = true, minSize, maxSize, unique }: ValidationArrayOptions = {
    required: true,
    unique: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsString({ each: true })(target, propertyKey);
    Transform(({ value }) =>
      Array.isArray(value) ? value : isNullOrUndefined(value) ? [] : [value],
    )(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (required) IsNotEmpty({ each: true })(target, propertyKey);
    else IsOptional()(target, propertyKey);
    ApiProperty({ minItems: minSize, maxItems: maxSize })(target, propertyKey);
  };
}

/**
 * Validate array of object is valid
 */
export function IsValidArrayObject(
  { maxSize, minSize, required = true, defaults }: ValidationArrayOptions,
  object: { new (...args: any[]): any },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsArray()(target, propertyKey);
    ValidateNested({ each: true })(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (Array.isArray(defaults)) {
      Transform(({ value }) =>
        Array.isArray(value)
          ? value
          : isNullOrUndefined(value)
            ? defaults
            : [value],
      )(target, propertyKey);
    } else {
      Transform(({ value }) =>
        Array.isArray(value) ? value : isNullOrUndefined(value) ? [] : [value],
      )(target, propertyKey);
    }
    Type(() => object)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
    ApiProperty({ minItems: minSize, maxItems: maxSize })(target, propertyKey);
  };
}

export function IsValidArrayEnum(
  {
    maxSize,
    minSize,
    unique,
    required = true,
    defaults,
  }: Omit<ValidationArrayOptions, 'minValue' | 'maxValue'>,
  enumObj: object,
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsArray()(target, propertyKey);
    IsEnum(enumObj, { each: true })(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (Array.isArray(defaults)) {
      Transform(({ value }) =>
        Array.isArray(value) ? value : value ? [value] : defaults,
      )(target, propertyKey);
    } else {
      Transform(({ value }) =>
        Array.isArray(value) ? value : value ? [value] : [],
      )(target, propertyKey);
    }
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
    ApiProperty({ minItems: minSize, maxItems: maxSize })(target, propertyKey);
  };
}

/**
 * Excllude all field exist
 */
export function ExcludeAllField(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const constraints = args.constraints;
          for (const keyField of constraints) {
            const relatedValue = (args.object as any)[keyField];
            if (relatedValue) return false;
          }

          return true;
        },
        defaultMessage(args?: ValidationArguments) {
          return 'ExcludeAllField validation failed';
        },
      },
    });
  };
}

/**
 * Require all field exist
 */
export function RequireAllField(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const constraints = args.constraints;
          for (const keyField of constraints) {
            const relatedValue = (args.object as any)[keyField];
            if (!relatedValue) return false;
          }

          return true;
        },
        defaultMessage() {
          return `RequireAllField validation failed`;
        },
      },
    });
  };
}

/**
 * Require one of fields exist
 */
export function IsRequireOneOf(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const constraints = args.constraints;

          for (const keyField of constraints) {
            const relatedValue = (args.object as any)[keyField];
            if (relatedValue) return true;
          }

          return false;
        },

        defaultMessage(args?: ValidationArguments) {
          return `IsRequireOneOf validation failed`;
        },
      },
    });
  };
}

/**
 * Validate only one field exists, if two field, or no filed exist, this will throw error
 * @param property Fields to check exists
 * @param validationOptions
 */
export function IsOnlyOneFieldExist(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const constraints = args.constraints;
          let isExisted = false;
          const obj = args.object as any;

          for (const fieldKey of constraints) {
            const fieldValue = obj[fieldKey];

            // Two field exists
            if (!isNullOrUndefined(fieldValue) && isExisted) return false;

            if (!isNullOrUndefined(fieldValue)) isExisted = true;
          }

          if (!isNullOrUndefined(obj[args.property]) && isExisted) return false;

          return true;
        },
        defaultMessage(args?: ValidationArguments): string {
          return `IsOnlyOneFieldExist validation failed`;
        },
      },
    });
  };
}

type ValidationEnumStringOptions = {
  enum: Record<string, any>;
  required?: boolean;
  default?: string;
};

type ValidationEnumNumberOptions = {
  enum: Record<string, any>;
  required?: boolean;
  default?: number;
};

export function IsValidEnumNumber(
  opts: ValidationEnumNumberOptions,
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsEnum(opts.enum)(target, propertyKey);
    if (opts.required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
    if (opts.default)
      Transform(({ value }) => value || opts.default)(target, propertyKey);
  };
}

export function IsValidEnumString(
  opts: ValidationEnumStringOptions,
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsEnum(opts.enum)(target, propertyKey);
    if (opts.required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

type ValidationBooleanOptions = {
  required?: boolean;
  default?: boolean;
};

export function IsValidBoolean(
  { default: _default, required }: ValidationBooleanOptions = {
    required: true,
  },
) {
  return function (target: any, propertyKey: string | symbol): void {
    IsBoolean()(target, propertyKey);
    Transform(({ value }) => {
      if (isNullOrUndefined(value)) {
        return typeof _default === 'boolean' ? _default : value;
      } else return boolean(value);
    })(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

type ValidationEmailOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  matches?: RegExp;
  trim?: boolean;
};

export function IsValidEmail(
  {
    minLength = 1,
    maxLength = 255,
    required = true,
    matches,
    trim = true,
  }: ValidationEmailOptions = {
    required: true,
    minLength: 1,
    maxLength: 255,
    trim: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsEmail({})(target, propertyKey);
    MinLength(minLength)(target, propertyKey);
    MaxLength(maxLength)(target, propertyKey);
    if (trim) {
      Transform(({ value }: { value: string }) => {
        if (value !== null) return value.trim();
        else return value;
      })(target, propertyKey);
    }
    if (matches) Matches(matches)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
    ApiProperty({ pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$' })(
      target,
      propertyKey,
    );
  };
}

/**
 * Validate url
 */
type ValidationUrlOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  trim?: boolean;
  urlOpts?: IsURLOptions;
};

export function IsValidUrl(
  {
    maxLength = 255,
    required = true,
    trim = true,
    urlOpts = {},

    minLength,
  }: ValidationUrlOptions = {
    required: true,
    maxLength: 255,
    trim: true,
    urlOpts: {},
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string): void {
    IsUrl(urlOpts)(target, propertyKey);
    MaxLength(maxLength)(target, propertyKey);
    if (trim) {
      Transform(({ value }: { value: string }) => value?.trim?.())(
        target,
        propertyKey,
      );
    }
    if (minLength) {
      MinLength(minLength)(target, propertyKey);
    }
    if (required) {
      IsNotEmpty()(target, propertyKey);
    } else {
      IsOptional()(target, propertyKey);
    }
  };
}
