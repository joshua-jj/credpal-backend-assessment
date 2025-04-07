import { Controller, Get } from "routing-controllers";


@Controller('/users')
export class UsersController {
  @Get()
  getAll() {
    return {message: 'This action returns all users'};
  }
}
