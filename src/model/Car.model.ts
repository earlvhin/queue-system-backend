/**
 * Car Model
 * Define the table and its columns and datatype
*/

import { DataTypes } from 'sequelize';
import { dbConnection as sequelize } from '../db/config/DbSetup.config';

export const Car = sequelize.define('cars', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    }
});