import { Request, Response } from 'express';
import { ReadAllPostsService } from '@posts/domain/services/ReadAllPostsService';
import { ReadOnePostService } from '@posts/domain/services/ReadOnePostService';
import { MongoDBPostRepository } from '@posts/infra/database/mongoDB/repositories/PostRepository';

export class PostController {


    public async readAll(request: Request, response: Response): Promise<Response> {

        const postRepository = new MongoDBPostRepository()

        const readAllPostsService = new ReadAllPostsService(postRepository)
        const posts = await readAllPostsService.execute()
        return response.json(posts)
    }

    public async readOne(request: Request, response: Response): Promise<Response> {
        const { slug } = request.params

        const postRepository = new MongoDBPostRepository()

        const readOnePostService = new ReadOnePostService(postRepository)
        const posts = await readOnePostService.execute(slug)
        return response.json(posts)
    }

}