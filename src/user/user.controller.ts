import { CreateUserDto } from './dto/createUser.dto';
import {Controller, Post, Body, Get, UsePipes, UseGuards, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { BackendValidationPipes } from 'src/shared/pipes/backendValidation.pipe';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('users')
    @UsePipes(new BackendValidationPipes())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        console.log(createUserDto)
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('users/login')
    @UsePipes(new BackendValidationPipes())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface>{
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(
        @User() user: UserEntity
    ): Promise<UserResponseInterface>{
        return this.userService.buildUserResponse(user)
    }

    @Put('/user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserid: number,
        @Body('user') updateUserDto:UpdateUserDto
    ):Promise<UserResponseInterface>{
        const user = await this.userService.updateUser(
            currentUserid, 
            updateUserDto
        )
        return this.userService.buildUserResponse(user)
    }
} 