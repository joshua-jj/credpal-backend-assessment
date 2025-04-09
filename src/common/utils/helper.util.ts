
import { User } from '@modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class HelperUtil {
  public static parseApiResponse = (
    statusCode: number,
    message: string,
    data: Record<string, any> = null,
  ) => {
    return { statusCode, message, data };
  };

  public static hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  };

  public static createJwtPayload = (user: User) => {
    return {
      id: user.id,
      email: user.email,
    };
  };
}
