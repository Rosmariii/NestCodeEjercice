import { IPassenger } from "./passenger.interface";
import { IWeather } from "./weather.location";


export interface IFlight extends Document {
    _id?:               string;
    pilot:              string;
    airplane:           string;
    destinantionCity:   string;
    flightDate:         Date;
    passengers:         IPassenger[];
    weather:            IWeather[];
}