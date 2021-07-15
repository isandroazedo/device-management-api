import * as Sequelize from 'sequelize'
import sequelize from './index'

export interface CategoryAddModel {
    name: string
}

export interface CateogryModel extends Sequelize.Model<CateogryModel, CategoryAddModel> {
    id: number
}

export const Category = sequelize.define<CateogryModel, CategoryAddModel>('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
})