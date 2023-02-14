import { IsNotEmpty } from "class-validator";
import { IsEmail } from "class-validator/types/decorator/decorators";

export class UpdateUserDto {
    readonly username: string;
    readonly email: string;
    readonly bio: string;
    readonly image: string;
}