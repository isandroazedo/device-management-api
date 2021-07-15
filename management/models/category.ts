import * as Sequelize from 'sequelize'
import sequelize from '../../core/index'

export interface CategoryAddModel {
    name: string
}

export interface CategoryModel extends Sequelize.Model<CategoryModel, CategoryAddModel> {
    id: number
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
  })