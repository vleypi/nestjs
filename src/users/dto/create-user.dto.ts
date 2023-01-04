import {IsString, IsEmail,Length} from 'class-validator'

export class CreateUserDto{
    @IsEmail({},{message: 'Некорректный email'})
    readonly email: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(4,16,{message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}