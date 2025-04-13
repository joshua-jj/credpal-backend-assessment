import { Public } from '@common/decorators/public.decorator';
import { HelperUtil } from '@common/utils/helper.util';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({ summary: 'User signup' })
  @ApiBody({ type: CreateUserDto })
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
  @ApiOperation({ summary: 'User signin' })
  @ApiBody({ type: LoginDto })
  @Public()
  @Post('/login')
  async logIn(@Body() body: LoginDto) {
    const data = await this.authenticationService.logIn(body);
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Login in successful',
      data,
    );
  }
}
