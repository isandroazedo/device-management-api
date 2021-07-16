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

    const path = '/management/categories';
    let category: CategoryModel;
    
    beforeEach(async () => {
        await Category.sync({force: true});
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
});