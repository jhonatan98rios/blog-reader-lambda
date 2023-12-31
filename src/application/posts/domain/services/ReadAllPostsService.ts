import { IPost } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type ReadAllPostsResponse = {
    posts: IPost[]
}

export class ReadAllPostsService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(): Promise<ReadAllPostsResponse> {

        try {
            const posts = await this.postRepository.readAll()
            return { posts }
        } catch (err) {
            return err as ReadAllPostsResponse
        }
    }
}