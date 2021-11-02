import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {

    constructor( private readonly flightService: FlightService, 
        private readonly passengerService: PassengerService){}

    @Get()
    findAll(){
        return this.flightService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id)
    }

    @Post()
    create( @Body() flightDTO: FlightDTO ){
        return this.flightService.create(flightDTO);
    }

    @Post(':flightId/passenger/:passengerId')
    async addpassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {
        const passenger = await this.passengerService.findOne(passengerId);
        if(!passenger) 
            throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
        return this.flightService.addpassenger(flightId, passengerId)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
        return this.flightService.update(id, flightDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.flightService.delete(id)
    }

}