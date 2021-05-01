import * as dotenv from 'dotenv';
import * as logsym from 'log-symbols';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';
import { SocketService } from './services/SocketService';

export class App {
    app: Application = express();
    server: Server;
    socket: SocketIOServer;

    constructor() {
        /**
         * .env - Environment Variable Initialization
        */
        dotenv.config();

        /**
         * Middleware Initialization
        */
        this.middleWares();

        /**
         * Set Port Availability
        */
        const PORT = process.env.PORT || 5000;

        /**
         * Initialize Express Server
        */
        this.server = this.app.listen(PORT, () => {
            console.log(logsym.success, `Server is running on port ${PORT}`)
        })

        /**
         * Initialize Socket Server 
        */
        this.socket = new SocketIOServer(this.server,{
            cors: {
                origin: "*"
            }
        });

        /**
         * Initialize Socket Service 
        */
        new SocketService(this.socket);
    
        /**
         * Test Route 
        */
        this.app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({
                message: 'pong'
            })
        })
    }

    middleWares(): void {
        /**
         * Http Request Logger 
        */
        this.app.use(logger('dev'));

        /**
         * Body Parser 
        */
        this.app.use(express.json({ limit: '256mb' }));
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: '256mb',
                parameterLimit: 50000,
            }),
        );

        /**
         * Allow CORS 
        */
        this.app.use(cors());
    }
}