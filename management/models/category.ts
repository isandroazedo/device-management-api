import * as Sequelize from 'sequelize'
import sequelize from '../../core/index'
import { Device } from './device';

export interface CategoryAddModel {
    name: string
}

export interface CategoryModel extends Sequelize.Model<CategoryModel, CategoryAddModel> {
    id: number
}

export interface CategoryViewModel extends CategoryModel, CategoryAddModel {

}

export const Category = sequelize.define<CategoryModel, CategoryAddModel>('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    freezeTableName: true,
  }); 