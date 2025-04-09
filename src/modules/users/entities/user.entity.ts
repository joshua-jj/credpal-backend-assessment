import { BaseAbstractEntity } from '@common/entities/base.entity';
import { UserStatus } from '@common/enums/user-status.enum';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseAbstractEntity {
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;
}
