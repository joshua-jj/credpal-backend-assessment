import { CreateUserTable1744210381406 } from './1744210381406-CreateUserTable';
import { CreateWallet1744266034857 } from './1744266034857-CreateWallet';
import { CreateTransactionsTable1744268064137 } from './1744268064137-CreateTransactionsTable';
import { DropWalletsTableIdx1744281421588 } from './1744281421588-DropWalletsTableIdx';

const migrations = [
  CreateUserTable1744210381406,
  CreateWallet1744266034857,
  CreateTransactionsTable1744268064137,
  DropWalletsTableIdx1744281421588,
];

export default migrations;
