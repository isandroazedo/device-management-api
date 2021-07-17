export class GenericDAO<T, R> {

    manager: any;

    protected constructor(manager: any) {
        this.manager = manager;
    }

    create(entity: T): Promise<R> {
        return this.manager.create(entity);
    }

    findById(id: number): Promise<R> {
        return this.manager.findOne({ where: { "id": id } });
    }

    delete(id: number): Promise<number> {
        return this.manager.destroy({
            where: {
                "id": id
            }
        });
    }

    findAll(): Promise<R[]> {
        return this.manager.findAll();
    }

    truncate(): Promise<any> {
        return this.manager.destroy({
            where: {},
            truncate: { cascade: true }
        });
    }
}