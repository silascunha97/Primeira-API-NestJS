import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dtos';
import { UserEntity } from './interface/user.entity';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    

    async CreateUser(createUser: CreateUserDTO): Promise<UserEntity> {
        
        //Criação de um hash para a senha do usuário
        const saltOrRounds = 10;
        const passwordHash = await hash(createUser.password, saltOrRounds).toString();        
        
        //chama o array de usuarios vazios e instancia um novo usuario salvando no BD
        return this.userRepository.save({
            ...createUser,
            password: passwordHash,
        });
        
       
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
