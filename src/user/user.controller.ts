import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dtos';

@Controller('user')
export class UserController {

    @Get()
    async getUser() {
        return JSON.stringify({test: 'test'});
    }

    @Post()
    async createUser(@Body()createUser : CreateUserDTO) {
        return createUser;
    }
}
