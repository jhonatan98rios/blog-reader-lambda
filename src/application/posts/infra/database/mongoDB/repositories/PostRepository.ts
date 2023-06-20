import { IPost } from "@posts/domain/models/Post"
import { AbstractPostRepository } from "@posts/domain/repositories/AbstractPostRepository";
import { PostModel, IPostModel } from "../models/Post.schema";

export class MongoDBPostRepository implements AbstractPostRepository {

    private postModel: IPostModel

    constructor() {
        this.postModel = PostModel.getInstance()
    }

    async readAll(): Promise<IPost[]> {
        return await this.postModel.find().sort({ createdAt: -1 })
    }

    async readOne(slug: string): Promise<IPost | null> {
        const post = await this.postModel.findOne({ slug })
        return post ?? null
    }
}