import { ValueTransformer } from 'typeorm';
import { isNullOrUndefined } from './utility.helper';

class BigNumberTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (isNullOrUndefined(data)) return null;

    return data;
  }

  from(data?: string | null): number | null {
    if (isNullOrUndefined(data)) return null;

    const result = parseFloat(data);

    if (isNaN(result)) {
      return null;
    } else {
      return result;
    }
  }
}

export const bigNumberTransformer = new BigNumberTransformer();
