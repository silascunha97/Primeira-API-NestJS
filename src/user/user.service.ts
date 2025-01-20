import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dtos';
import { User } from './interface/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {

    private users: User[] = [];

    async CreateUser(createUser: CreateUserDTO) {
        
        //Criação de um hash para a senha do usuário
        const saltOrRounds = 10;
        const passwordHash = await hash(createUser.password, saltOrRounds);                
        
        //chama o array de usuarios vazios e instancia um novo usuario
        const user: User = ({
            ...createUser,
            id: this.users.length + 1,
            password: passwordHash
        });

        this.users.push(user);

        //console.log(passwordHash);
        return user;
    }

    async getAllUser(): Promise<User[]> {
        return this.users
    }
}
