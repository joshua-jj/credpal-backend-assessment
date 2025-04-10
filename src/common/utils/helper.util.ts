
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

  public static isPasswordsMatched = async (password: string, referencedPassword: string) =>  {
    return await bcrypt.compare(password, referencedPassword)
  }

  public static createJwtPayload = (user: User) => {
    return {
      id: user.id,
      email: user.email,
    };
  };

  public static generateWalletId = (): `WAL${string}` => {
    return `WAL`;
  }
}
