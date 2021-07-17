import { Device, DeviceAddModel, DeviceViewModel } from "./device";
import { GenericDAO } from "./generic.dao";

export class DeviceDAO extends GenericDAO<DeviceAddModel, DeviceViewModel> {
    constructor(){
        super(Device);
    }
}