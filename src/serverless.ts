import 'module-alias/register'
import Database from './adapters/database/MongoDB/connection'
import * as dotenv from 'dotenv'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PostController } from '@posts/infra/http/controllers/PostController';

dotenv.config()

export const readAll: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const database = new Database({
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASS!,
        collection: process.env.DATABASE_NAME!,
    })

    await database.connect()

    const postController = new PostController()
    
    try {
        return {
            statusCode: 200,
            body: await postController.readAll()
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: 'An error occured',
                    input: err
                }
            )
        }
    }
}


export const readOne: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const database = new Database({
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASS!,
        collection: process.env.DATABASE_NAME!,
    })
    await database.connect()

    const postController = new PostController()
    const slug = event.pathParameters?.slug!

    try {
        return {
            statusCode: 200,
            body: await postController.readOne(slug)
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: 'An error occured',
                    input: {
                        body: slug
                    }
                }
            )
        }
    }
}
