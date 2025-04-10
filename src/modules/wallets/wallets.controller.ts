import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { HelperUtil } from '@common/utils/helper.util';

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

  @Post('fund')
  fund(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
