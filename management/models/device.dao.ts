import * as Sequelize from 'sequelize';
import { Category } from "./category";
import { Device, DeviceAddModel, DeviceViewModel } from "./device";
import { GenericDAO } from "./generic.dao";

export class DeviceDAO extends GenericDAO<DeviceAddModel, DeviceViewModel> {

    constructor() {
        super(Device);
    }

    findAll(): Promise<DeviceViewModel[]> {
        return this.manager.findAll({
            include: [{// Notice `include` takes an ARRAY
                model: Category
            }]
        })
    }

    findOneByCategory(id: any): Promise<DeviceViewModel> {
        return this.manager.findOne({
            include: {
                model: Category,
                where: {
                    id: {
                        [Sequelize.Op.eq]: id
                    }
                }
            }
        })
    }
}