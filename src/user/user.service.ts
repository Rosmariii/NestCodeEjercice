import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interface/user.interface';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt'
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

    constructor( @InjectModel(USER.name) private readonly model:Model<IUser> ){}

    async findAll(): Promise<IUser[]>{
        return await this.model.find();
    }

    async findOne( id:string ): Promise<IUser>{
        return await this.model.findById(id);
    }

    async hashPassword( password: string ): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash( password, salt );
    }

    async create( userDTO:UserDTO ): Promise<IUser>{
        const hash = await this.hashPassword( userDTO.password );
        const newUser = new this.model({ ...userDTO,password:hash });
        return newUser.save();
    }

    async update( id: string, userDTO: UserDTO ): Promise<IUser>{
        const hash = await this.hashPassword( userDTO.password );
        const user = { ...userDTO, password:hash }; 
        return await this.model.findByIdAndUpdate( id, user, { new: true } );
    } 

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: 'Deleted'}
    }

}
