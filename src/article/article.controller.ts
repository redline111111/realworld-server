import { Controller, Post, UseGuards, Body, Get, Param, Delete, Put, UsePipes, Query } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { BackendValidationPipes } from "src/shared/pipes/backendValidation.pipe";
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/user.entity";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}
    
    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any): Promise<ArticlesResponseInterface>{
        return await this.articleService.findAll(currentUserId, query);

    }

    @Get('feed')
    @UseGuards(AuthGuard)
    async getFeed(
        @User('id') currentUserId: number,
        @Query() query: any,
    ): Promise<ArticlesResponseInterface> {
        return await this.articleService.getFeed(currentUserId, query)
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new BackendValidationPipes())
    async create(
        @User() currentUser: UserEntity,
        @Body('article') createAricleDto: CreateArticleDto
    ): Promise<ArticleResponseInterface>{
        const article = await this.articleService.createArticle(currentUser, createAricleDto)
        return this.articleService.buildArticleResponse(article)
    }

    @Get(':slug')
    async getSingleArticle(
        @Param('slug') slug: string
    ): Promise<ArticleResponseInterface>{
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponse(article)
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(@User('id') currentUserId: number, @Param('slug') slug: string) {
        return this.articleService.deleteArticle(slug, currentUserId)
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new BackendValidationPipes())
    async updatedArticle(@User('id') currentUserId: number, @Param('slug') slug: string, @Body('article') updateArticleDto: CreateArticleDto): Promise<ArticleResponseInterface> {
        const article = await this.articleService.updateArticle(
            slug,
            updateArticleDto,
            currentUserId,
        );
        return this.articleService.buildArticleResponse(article)
    }

    @Post(':/slug/favourite')
    @UseGuards(AuthGuard)
    async addArticleToFavourites(
        @User('id') currentUserId: number,
        @Param('slug') slug: string
    ){
        const article = await this.articleService.addArticleToFavourites(
            slug, 
            currentUserId
        )
        return this.articleService.buildArticleResponse(article)
    }

    @Delete(':/slug/favourite')
    @UseGuards(AuthGuard)
    async deleteArticleToFavourites(
        @User('id') currentUserId: number,
        @Param('slug') slug: string
    ){
        const article = await this.articleService.deleteArticleFromFavourites(
            slug, 
            currentUserId
        )
        return this.articleService.buildArticleResponse(article)
    }
}