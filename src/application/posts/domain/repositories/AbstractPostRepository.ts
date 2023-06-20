import { IPost } from "../models/Post";

export abstract class AbstractPostRepository {
    abstract readAll(): Promise<IPost[]>
    abstract readOne(slug: string): Promise<IPost | null>
}