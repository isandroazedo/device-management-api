import { DeviceAddModel, DeviceModel, DeviceViewModel } from "../models/device";
import { DeviceDAO } from "../models/device.dao";
import { BaseService } from "./base.service";

export class DeviceService extends BaseService<DeviceAddModel, DeviceViewModel, DeviceDAO> {
    constructor() {
        super(new DeviceDAO());
    }
}