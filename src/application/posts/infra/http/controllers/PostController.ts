import { ReadAllPostsService } from '@posts/domain/services/ReadAllPostsService';
import { ReadOnePostService } from '@posts/domain/services/ReadOnePostService';
import { MongoDBPostRepository } from '@posts/infra/database/mongoDB/repositories/PostRepository';

export class PostController {

    public async readAll(): Promise<string> {

        const postRepository = new MongoDBPostRepository()

        const readAllPostsService = new ReadAllPostsService(postRepository)
        const posts = await readAllPostsService.execute()
        return JSON.stringify(posts)
    }

    public async readOne(slug: string): Promise<string> {
        const postRepository = new MongoDBPostRepository()

        const readOnePostService = new ReadOnePostService(postRepository)
        const posts = await readOnePostService.execute(slug)
        return JSON.stringify(posts)
    }

}