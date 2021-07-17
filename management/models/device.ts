import * as Sequelize from 'sequelize';
import sequelize from '../../core/index';

export interface DeviceAddModel {
    category: number;
    color: string;
    partNumber: number;
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
    category: {
        type: Sequelize.INTEGER,
        references: { model: 'category', key: 'id' },
        allowNull: false
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
