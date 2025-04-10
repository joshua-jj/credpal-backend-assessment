import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from '@common/decorators/public.decorator';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { HelperUtil } from '@common/utils/helper.util';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const data = await this.authenticationService.signUp(body);
    return HelperUtil.parseApiResponse(
      HttpStatus.CREATED,
      'Sign up successful',
      data,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  async logIn(@Body() body: LoginDto) {
    const data = await this.authenticationService.logIn(body);
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Sign in successful',
      data,
    );
  }
}
