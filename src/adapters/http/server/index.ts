import 'express-async-errors';
import express, { Express } from 'express'
import cors from 'cors';
import helmet from 'helmet'
import { useAppError } from '../middlewares/useAppError'
import Database from '@adapters/database/MongoDB/connection';
import mongoose from 'mongoose';

interface IServer {
    database: Database
}

export class Server {

    app: Express
    connection: typeof mongoose | undefined;

    constructor() {

        this.app = express()
        this.app.use(express.json())

        this.app.use(cors())
        this.app.use(helmet())
        this.app.disable('x-powered-by')

        this.app.use(useAppError)         
    }
    
    public async connect({ database }: IServer) {
        this.connection = await database.connect()
    }

    public listen(port: number) {
        this.app.listen(process.env.PORT || port, () => {
            console.log(`Server started on port ${process.env.PORT || port}! 🏆`)
        });
    }
}