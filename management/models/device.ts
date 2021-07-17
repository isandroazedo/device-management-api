import * as Sequelize from 'sequelize';
import sequelize from '../../core/index';
import { Category, CategoryViewModel } from './category';

export interface DeviceAddModel {
    category: number | CategoryViewModel;
    color: string;
    partNumber: number;
    categoryId: number;
}

export interface DeviceModel extends Sequelize.Model<DeviceModel, DeviceAddModel> {
    id: number
}

export interface DeviceViewModel extends DeviceModel, DeviceAddModel {

}

export const Device = sequelize.define<DeviceModel, DeviceAddModel>('device', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    color: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    partNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    freezeTableName: true,
});

Category.hasMany(Device, { foreignKey: { allowNull: false } });
Device.belongsTo(Category, { foreignKey: { allowNull: false } });
