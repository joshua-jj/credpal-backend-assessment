import { Controller, Get, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { HelperUtil } from '@common/utils/helper.util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @Get('profile')
  async getProfile(@CurrentUser('id', ParseIntPipe) userId: number) {
    const data = this.usersService.getProfile(userId);
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Profile gotten successfully',
      data,
    );
  }
}
