import * as dotenv from 'dotenv';
import * as logsym from 'log-symbols';
import carRoutes from './routes/Car.routes';
import cors from 'cors';
import express, { Application } from 'express';
import logger from 'morgan';
import testRoute from './routes/Test.routes';
import userRoutes from './routes/User.routes';
import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';
import { SocketService } from './services/Socket.service';
import { dbConnection as sequelize } from './db/config/DbSetup.config';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';

const schema = require('./graphql/schema');

export class App {
    app: Application = express();
    apollo_server: ApolloServer;
    server: Server;
    socket: SocketIOServer;

    constructor() {
        /**.env - Environment Variable Initialization */
        dotenv.config();

        /** Database Connection */
        this.dbTestConnection();

        /** Middleware Initialization */
        this.middleWares();

        /** Set Port Availability */
        const PORT = process.env.PORT || 5000;

        /** Apollo Express Server */
        this.apollo_server = new ApolloServer({
            schema
		})

		this.apollo_server.applyMiddleware({ app: this.app });

        /** Initialize Express Server */
        this.server = this.app.listen(PORT, () => {
            console.log(logsym.success, `Server is running on port ${PORT}`)
        })

        /** Initialize Socket Server */
        this.socket = new SocketIOServer(this.server,{
            cors: {
                origin: "*"
            }
        });

        /** Initialize Socket Service */
        new SocketService(this.socket);

        /** Initialize API Routes */
        this.initializeRoutes();
    }

    initializeRoutes() {
        /** Add Routes Here */
        this.app.use('/api', carRoutes);
        this.app.use('/api', userRoutes);
        this.app.use('/api', testRoute)
    }

    middleWares(): void {
        /** Http Request Logger */
        this.app.use(logger('dev'));

        /** Body Parser */
        this.app.use(express.json({ limit: '256mb' }));
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: '256mb',
                parameterLimit: 50000,
            }),
        );

        /** Compression */
        this.app.use(compression());

        /** Allow CORS */
        this.app.use(cors());
    }

    async dbTestConnection() {
        try {
            await sequelize.authenticate();
            console.log(logsym.success, 'Connection to the Database is Successful');
        } catch (error) {
            console.error(logsym.error, 'Unable to connect to the database:', error);
        }
    }
}