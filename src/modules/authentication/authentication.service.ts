import { HelperUtil } from '@common/utils/helper.util';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(AuthenticationService.name);
  }

  async signUp(signUpData: CreateUserDto) {
    const { email } = signUpData;
    const [user] = await this.usersService.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.usersService.create(signUpData);
    const payload = HelperUtil.createJwtPayload(newUser);
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      user: payload,
    };
  }

  async logIn(loginData: LoginDto) {
    const { email, password } = loginData;
    const [user] = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isMatch = await HelperUtil.isPasswordsMatched(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Incorrect Password');
    }

    const payload = HelperUtil.createJwtPayload(user);
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      user: payload,
    };
  }
}
