/**
 * User Model
 * Define the table and its columns and datatype
*/

import { DataTypes } from 'sequelize';
import { dbConnection as sequelize } from '../config/DbSetup.config';

export const User = sequelize.define('users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    }
});