import * as dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';

/**
 * .env - Environment Variable Initialization
*/
dotenv.config({
    path: path.join(__dirname, '../../', '.env')
});

/**
 * Database Connection Setup 
*/
export const dbConnection = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!, {
        host: process.env.DB_HOST!,
        dialect: 'mariadb',
        define: {
            timestamps: false
        }
    }
)