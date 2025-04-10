import { CurrentUser } from '@common/decorators/current-user.decorator';
import { HelperUtil } from '@common/utils/helper.util';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { FundWalletDto } from './dto/fund-wallet.dto';
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

  @ApiOperation({ summary: 'Fund wallet' })
  @ApiBody({ type: FundWalletDto })
  @Post('fund')
  fund(@Body() body: FundWalletDto) {
    // return this.walletsService.findOne(+id);
  }
}
