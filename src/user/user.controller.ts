import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dtos';
import { UserService } from './user.service';
import { User } from './interface/user.interface';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    // Função assincrona que busca e retorna todos os usuários
    @Get()
    async getAllUser():Promise<User[]> {
        return this.userService.getAllUser();
    }

    // Função assincrona que envia um usuário pelo metedo POST
    @Post()
    async createUser(@Body()createUser : CreateUserDTO): Promise<User>  {
        return this.userService.CreateUser(createUser);
    }
}
