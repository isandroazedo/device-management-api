export interface BaseModel<T> {
    create(entity: T): T;
    findById(id: number): Promise<T>;
    destroy(options: object): Promise<any>;
    findAll(): Promise<Array<T>>;
}