import { User } from '@modules/users/entities/user.entity';
import { Wallet } from '@modules/wallets/entities/wallet.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

type JwtPayload = User & Partial<Wallet>;
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

  public static isPasswordsMatched = async (
    password: string,
    referencedPassword: string,
  ) => {
    return await bcrypt.compare(password, referencedPassword);
  };

  public static createJwtPayload = (user: User) => {
    return {
      id: Number(user.id),
      email: user.email,
    };
  };

  public static generateWalletId = (): `W${string}` => {
    const uuid = uuidv4().replaceAll('-', '');
    const shortId = uuid.slice(0, 8).toUpperCase();
    return `W-${shortId}`;
  };

  public static isValidMMYY(dateString: string) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(dateString);
  }
}
