import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interface/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import axios from 'axios';
import * as moment from 'moment';
import { ILocation } from 'src/common/interface/location.interface';
import { IWeather } from 'src/common/interface/weather.location';

@Injectable()
export class FlightService {

    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight> ){}

    async getLocation( destinantionCity: string): Promise<ILocation> {
        const { data } = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinantionCity}`,);
        return data[0];
    }

    async getweather(woeid: number, flightDate: Date): Promise<IWeather[]> {
        const dateformat = moment.utc(flightDate).format();

        const year = dateformat.substring(0, 4);
        const month = dateformat.substring(5, 7);
        const day = dateformat.substring(8, 10);

        const { data }: any = await axios.get(`https://www.metaweather.com/api//location/${woeid}/${year}/${month}/${day}`);

        return data;
    }

    assing({_id, pilot, airplane, destinantionCity, flightDate, passengers,}
        : IFlight, weather: IWeather[]): IFlight {
        return Object.assign({
            _id, 
            pilot, 
            airplane, 
            destinantionCity, 
            flightDate, 
            passengers, 
            weather,
        })
    }

    async findAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }

    async findOne(id:string): Promise<IFlight> {
        const flight = await this.model.findById( id ).populate('passengers');
        const location: ILocation = await this.getLocation(flight.destinantionCity);

        const weather: IWeather[] = await this.getweather(location.woeid, flight.flightDate,);
        return this.assing(flight, weather);
    }

    async create( flightDTO: FlightDTO ): Promise<IFlight> {
        const newFlight = new this.model( flightDTO );
        return await newFlight.save();
    }

    async addpassenger(flightId: string, passengerId: string): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(
            flightId, {
            $addToSet: { passengers: passengerId }
            }, 
            { new: true }
        ).populate('passengers');
    }

    async update( id: string, flightDTO: FlightDTO): Promise<IFlight> {
        return await this.model.findByIdAndUpdate( id, flightDTO, { new: true } );
    }

    async delete(id: string){
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: 'Deleted' }
    }

}
