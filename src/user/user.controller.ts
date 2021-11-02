import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { IUser } from 'src/common/interface/user.interface';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
