import { BaseModel } from "./base.model";
import * as Sequelize from 'sequelize'

export class BaseDAO<T extends BaseModel<T>> {

    public model: T;

    constructor(public _model: T) {
        this.model = _model;
    }

    create(entity: any) {
        return this.model.create(entity);
    }

    findById(id: number): Promise<any> {
        return this.model.findById(id);
    }

    delete(id: number): Promise<any> {
        return this.model.destroy({
          where: {
              "id": id
           }
      });
    }

    findAll(): Promise<any[]> {
        return this.model.findAll();
    } 

    truncate(): Promise<any> {
        return this.model.destroy({
            where: {},
            truncate: { cascade: true }
        });
    }
}