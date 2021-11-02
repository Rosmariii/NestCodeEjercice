import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {

    constructor(private readonly passengerService: PassengerService){}

    @Get()
    findAll(){
        return this.passengerService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.passengerService.findOne(id)
    }

    @Post()
    create(@Body() passengerDTO:PassengerDTO){
        return this.passengerService.create(passengerDTO)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDTO:PassengerDTO) {
        return this.passengerService.update(id, passengerDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.passengerService.delete(id);
    }
}
