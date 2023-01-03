import { Controller, Body,Post,Get } from '@nestjs/common';
import { ApiResponse,ApiOperation } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
