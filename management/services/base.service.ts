import { GenericDAO } from "../models/generic.dao";

export class BaseService<T, R, D extends GenericDAO<T, R>> {
    public dao: D;

    constructor(public _dao: D) {
        this.dao = _dao;
    }

    async create(entity: T): Promise<R> {
        return  this.dao.create(entity);
    }

    async delete(id: number): Promise<number> {
        return this.dao.delete(id);
    }
    
    async list(): Promise<Array<R>> {
        return this.dao.findAll();
    }
}