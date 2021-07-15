import server from '../../../index';
import request from 'supertest';
import { Category } from '../../../management/models/category';

beforeAll(async () => {
    console.log('Tests started.');
});

afterAll(async () => {
    server.close();
    console.log('Tests finished.');
});

describe('Checking the registration of categories', () => {
    
    beforeEach(async () => {
        await Category.sync({force: true});
        await Category.create({
            name: "CAT1",
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    });

    test('It should be possible to list categories', async () => {
        const response = await request(server).get('/management/categories');
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});