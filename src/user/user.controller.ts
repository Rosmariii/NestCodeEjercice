import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/common/interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body() UserDTO:UserDTO){
        return this.userService.create(UserDTO);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO:UserDTO) {
        return this.userService.update(id, userDTO)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.delete(id)
    }
}
