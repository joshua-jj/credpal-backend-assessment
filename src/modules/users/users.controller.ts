import { CurrentUser } from '@common/decorators/current-user.decorator';
import { HelperUtil } from '@common/utils/helper.util';
import { Controller, Get, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @Get('profile')
  async getProfile(@CurrentUser('id', ParseIntPipe) userId: number) {
    const data = await this.usersService.getProfile(userId);
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Profile gotten successfully',
      data,
    );
  }
}
