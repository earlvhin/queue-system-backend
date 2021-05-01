import * as logsym from 'log-symbols';
import { QueryTypes } from 'sequelize';
import { dbConnection as sequelize } from '../config/DbSetup.config';
import { Car } from '../model/Car.model';

export class CarService {
    // Built in Sequelize Get All Query Sample
    async getAll() {
        try {
            const cars = await Car.findAll();
            return JSON.parse(JSON.stringify(cars, null, 2))
        } catch (err) {
            console.log(logsym.error, err);
        }
    }

    // Raw Query Sample
    async getAll_raw() {
        try {
            return await sequelize.query('SELECT * from cars', {
                type: QueryTypes.SELECT
            });
        } catch(err) {
            console.log(logsym.error, err);
        }
    }

    // Built in Sequelize Where Clause Query Sample
    async getUserById(id: string) {
        try {
            return await Car.findAll({
                where: {
                    id: id
                }
            })
        } catch(err) {
            console.log(logsym.error, err);
        }
    }
}