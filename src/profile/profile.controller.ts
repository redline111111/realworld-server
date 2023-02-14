import { Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import { Query } from "@nestjs/common/decorators";
import { ArticlesResponseInterface } from "src/article/types/articlesResponse.interface";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/user/decorators/user.decorator";
import { ProfileService } from "./profile.service";
import { ProfileResponseInterface } from "./types/profileResponse.interface";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}
    
    @Get()
    async getProfile(@User('id') currentUserId: number, @Param('username') profileUsername:string): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.getProfile(
            currentUserId,
            profileUsername
        );
        return this.profileService.buildProfileResponse(profile)
    }

    @Post(':username/follow')
    @UseGuards(AuthGuard)
    async followProfile(
        @User('id') currentUserId: number, 
        @Param('username') profileUsername:string
    ): Promise<ProfileResponseInterface>{
        const profile = await this.profileService.followProfile(
            currentUserId,
            profileUsername
        );
        return this.profileService.buildProfileResponse(profile)
    }

    @Delete(':username/follow')
    @UseGuards(AuthGuard)
    async unfollowProfile(
        @User('id') currentUserId: number, 
        @Param('username') profileUsername:string
    ): Promise<ProfileResponseInterface>{
        const profile = await this.profileService.unfollowProfile(
            currentUserId,
            profileUsername
        );
        return this.profileService.buildProfileResponse(profile)
    }

}