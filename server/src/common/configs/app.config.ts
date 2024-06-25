import { Paths } from 'ts-essentials';

export const appConfig = {
  environment: process.env.NODE_ENV,

  cloudinary: {
    preset: process.env.CLOUDINARY_PRESET,
  },

  auth: {
    accessToken: {
      secret: process.env.AUTH_JWT_ACCESS_TOKEN_KEY,
      algorithm: 'HS256',
      expiresTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRE,
    },
  },

  recombee: {
    dbId: process.env.RECOMBEE_DB_ID,
    privateToken: process.env.RECOMBEE_PRIVATE_TOKEN,
  }
};

export type AppConfig = Record<Paths<typeof appConfig>, string>;
