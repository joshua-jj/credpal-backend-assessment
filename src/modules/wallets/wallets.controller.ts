import { CurrentUser } from '@common/decorators/current-user.decorator';
import { HelperUtil } from '@common/utils/helper.util';
import {
  Controller,
  Get,
  HttpStatus
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiOperation({ summary: 'Get wallet balance' })
  @Get('balance')
  async getBalance(@CurrentUser('id') userId: number) {
    const data = await this.walletsService.getBalance(userId);
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Wallet balance gotten successfully',
      data,
    );
  }

}
