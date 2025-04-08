import { Constants } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(Constants.IS_PUBLIC_KEY, true);
