import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}
}
