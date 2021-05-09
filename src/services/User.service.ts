import * as logsym from 'log-symbols';
import { QueryTypes } from 'sequelize';
import { dbConnection as sequelize } from '../db/config/DbSetup.config';
import { User } from '../model/User.model';

// Built in Sequelize Get All Query Sample
export async function getAllUsers() {
    try {
        const users = await User.findAll();
        return JSON.parse(JSON.stringify(users, null, 2))
    } catch (err) {
        console.log(logsym.error, err);
    }
}

// Raw Query Sample
export async function getAllUsers_raw() {
    try {
        return await sequelize.query('SELECT * from users', {
            type: QueryTypes.SELECT
        });
    } catch(err) {
        console.log(logsym.error, err);
    }
}

// Built in Sequelize Where Clause Query Sample
export async function getUserById(id: string) {
    try {
        const user = await User.findAll({
            where: {
                id: id
            }
        })

        return JSON.parse(JSON.stringify(user[0], null, 2))
    } catch(err) {
        console.log(logsym.error, err);
    }
}