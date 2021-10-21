import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class UserDTO{
    @IsNotEmpty()
    @IsString()
    readonly name:       string;

    @IsNotEmpty()
    @IsString()
    readonly username:   string;

    @IsNotEmpty()
    @IsEmail()
    readonly email:      string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password:   string;
}