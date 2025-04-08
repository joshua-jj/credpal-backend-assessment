import { JwtConfig } from '@common/types/config.type';
import { registerAs } from '@nestjs/config';

const jwtConfig = registerAs('jwt', (): JwtConfig => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION,
}));

export default jwtConfig;
