import * as logsym from 'log-symbols';
import { QueryTypes } from 'sequelize';
import { dbConnection as sequelize } from '../config/DbSetup.config';
import { User } from '../model/User.model';

export class UserService {
    // Built in Sequelize Get All Query Sample
    async getAll() {
        try {
            const users = await User.findAll();
            return JSON.parse(JSON.stringify(users, null, 2))
        } catch (err) {
            console.log(logsym.error, err);
        }
    }

    // Raw Query Sample
    async getAll_raw() {
        try {
            return await sequelize.query('SELECT * from users', {
                type: QueryTypes.SELECT
            });
        } catch(err) {
            console.log(logsym.error, err);
        }
    }

    // Built in Sequelize Where Clause Query Sample
    async getUserById(id: string) {
        try {
            return await User.findAll({
                where: {
                    id: id
                }
            })
        } catch(err) {
            console.log(logsym.error, err);
        }
    }
}