import server from '../index';
import request from 'supertest';

beforeAll(async () => {
    console.log('Tests started.');
});

afterAll(async () => {
    server.close();
    console.log('Tests finished.');
});

describe('Checking the registration of categories', () => {
    test('It should be possible to list categories', async () => {
        const response = await request(server).get('/management/categories');
        expect(response.status).toEqual(200);
    });
});