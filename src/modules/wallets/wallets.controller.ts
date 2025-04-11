import { CurrentUser } from '@common/decorators/current-user.decorator';
import { HelperUtil } from '@common/utils/helper.util';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { WalletsService } from './wallets.service';
import { TransferDto } from './dto/transfer-dto';
import { CurrentRoute } from '@common/decorators/current-route.decorator';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiOperation({ summary: 'Get wallet balance' })
  @Get('balance')
  async getBalance(@CurrentUser('walletId') walletId: string) {
    const data = await this.walletsService.getBalance(walletId);
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Wallet balance gotten successfully',
      data,
    );
  }

  @ApiOperation({ summary: 'Fund wallet' })
  @ApiBody({ type: FundWalletDto })
  @Post('fund')
  async fund(
    @Body() body: FundWalletDto,
    @CurrentUser('walletId') walletId: string,
  ) {
    await this.walletsService.fund(body, walletId);
    return HelperUtil.parseApiResponse(HttpStatus.CREATED, 'Fund successful');
  }

  @ApiOperation({ summary: 'Wallet transfer' })
  @ApiBody({ type: TransferDto })
  @Post('transfer')
  async transfer(
    @Body() body: TransferDto,
    @CurrentUser('walletId') walletId: string,
  ) {
    await this.walletsService.transfer(body, walletId);
    return HelperUtil.parseApiResponse(
      HttpStatus.CREATED,
      'Transfer successful',
    );
  }

  @ApiOperation({ summary: 'Get all wallet transactions' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @Get('transactions')
  async getTransactions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search: string,
    @Query('filter') filter: string,
    @CurrentUser('walletId') walletId: string,
    @CurrentRoute() route: string,
  ) {
    const params = { page, limit, search, filter };
    const data = await this.walletsService.getTransactions(
      params,
      walletId,
      route,
    );
    return HelperUtil.parseApiResponse(
      HttpStatus.OK,
      'Wallet transactions retrieved successful',
      data,
    );
  }
}
