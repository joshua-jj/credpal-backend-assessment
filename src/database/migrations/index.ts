import { CreateUserTable1744210381406 } from './1744210381406-CreateUserTable';
import { CreateWallet1744266034857 } from './1744266034857-CreateWallet';
import { CreateTransactionsTable1744268064137 } from './1744268064137-CreateTransactionsTable';
import { DropWalletsTableIdx1744281421588 } from './1744281421588-DropWalletsTableIdx';
import { DropTransactionsTable1744359508923 } from './1744359508923-DropTransactionsTable';
import { CreateTransactionsTable1744359631169 } from './1744359631169-CreateTransactionsTable';
import { AddTransactionsTableColumn1744378835492 } from './1744378835492-AddTransactionsTableColumn';

const migrations = [
  CreateUserTable1744210381406,
  CreateWallet1744266034857,
  CreateTransactionsTable1744268064137,
  DropWalletsTableIdx1744281421588,
  DropTransactionsTable1744359508923,
  CreateTransactionsTable1744359631169,
  AddTransactionsTableColumn1744378835492
];

export default migrations;
