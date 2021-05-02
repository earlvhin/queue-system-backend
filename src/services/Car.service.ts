import * as logsym from 'log-symbols';
import { QueryTypes } from 'sequelize';
import { dbConnection as sequelize } from '../db/config/DbSetup.config';
import { Car } from '../model/Car.model';

// Built in Sequelize Get All Query Sample
export async function getAllCars() {
    try {
        const cars = await Car.findAll();
        return JSON.parse(JSON.stringify(cars, null, 2))
    } catch (err) {
        console.log(logsym.error, err);
    }
}

// Raw Query Sample
export async function getAllCars_raw() {
    try {
        return await sequelize.query('SELECT * from cars', {
            type: QueryTypes.SELECT
        });
    } catch(err) {
        console.log(logsym.error, err);
    }
}

// Built in Sequelize Where Clause Query Sample
export async function getCarById(id: string) {
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