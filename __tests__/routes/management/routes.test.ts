import server from '../../../index';
import request from 'supertest';
import { Category, CategoryModel } from '../../../management/models/category';

beforeAll(async () => {
    console.log('Tests started.');
});

afterAll(async () => {
    server.close();
    console.log('Tests finished.');
});

describe('Checking the registration of categories', () => {
    const path = '/management/category';
    let category: CategoryModel;
    
    beforeEach(async () => {
        await Category.destroy({
            where: {},
            truncate: true
        });
        category = await Category.create({
            name: 'CAT1',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    });

    test('It should be possible to list categories', async () => {
        const response = await request(server).get(path);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });


    test('It should be possible to remove categories', async () => {
        const deletePath = `${path}/${category.id}`;
        const response = await request(server).delete(deletePath);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("1");
    });

    test('It should not be possible to remove unknown category', async () => {
        const deletePath = `${path}/9000`;
        const response = await request(server).delete(deletePath);
        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Not found');
    });

    test('It should be possible to create a new category', async () => {
        const data = {name: 'john'};
        const res = await request(server)
        .post(path)
        .set('Accept', 'application/json')
        .send(data)
        .expect(201);
        expect(res.body.name).toStrictEqual(data.name);        
    });

    test('It should not be possible to create a new category without a name', async () => {
        const data = {name: null};
        const res = await request(server)
        .post(path)
        .set('Accept', 'application/json')
        .send(data)
        .expect(400);
        expect(res.text).toEqual("Category name is required");      
    });

    test('It should not be possible to create a new category with existing name', async () => {
        const data = {name: 'CAT1'};
        const res = await request(server)
        .post(path)
        .set('Accept', 'application/json')
        .send(data)
        .expect(400);
        expect(res.text).toEqual("There is already a category with the same name");      
    });
});