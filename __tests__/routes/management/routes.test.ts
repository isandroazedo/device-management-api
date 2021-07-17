import request from 'supertest';
import server from '../../../index';
import { Category, CategoryModel } from '../../../management/models/category';
import { DeviceViewModel } from '../../../management/models/device';
import { DeviceDAO } from '../../../management/models/device.dao';

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
        category = await Category.create({
            name: 'CAT1',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    });

    afterEach(async () => {
        await Category.destroy({
            where: {},
            truncate: { cascade: true }
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
        const data = { name: 'john' };
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(201);
        expect(res.body.name).toStrictEqual(data.name);
    });

    test('It should not be possible to create a new category without a name', async () => {
        const data = { name: null };
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(400);
        expect(res.text).toEqual("Category name is required");
    });

    test('It should not be possible to create a new category with existing name', async () => {
        const data = { name: 'CAT1' };
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(400);
        expect(res.text).toEqual("There is already a category with the same name");
    });

    test('It should not be possible to create a new category with invalid name length', async () => {
        const data = {
            "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit mollis dolor, eu posuere sapien lacinia id. Sed lectus."
        };
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(400);
        expect(res.text).toEqual("Data too long for column 'name' at row 1");
    });
});

describe('Checking the registration of devices', () => {
    const path = '/management/device';
    let device: DeviceViewModel;
    let category: CategoryModel;
    let deviceDAO = new DeviceDAO();

    beforeEach(async () => {
        category = await Category.create({
            name: 'CAT1',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        device = await deviceDAO.create({
            category: category.id,
            categoryId: category.id,
            color: 'WHITE',
            partNumber: 122312
        });
    });

    afterEach(async () => {
        await deviceDAO.truncate();
        await Category.destroy({
            where: {},
            truncate: { cascade: true }
        });
    });

    test('It should be possible to list devices', async () => {
        const response = await request(server).get(path);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('It should be possible to remove devices', async () => {
        const deletePath = `${path}/${device.id}`;
        const response = await request(server).delete(deletePath);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("1");
    });

    test('It should not be possible to remove unknown device', async () => {
        const deletePath = `${path}/9000`;
        const response = await request(server).delete(deletePath);
        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Not found');
    });

    test('It should be possible to create a new device', async () => {
        const data = {
            "category": category.id,
            "color": "WHITE",
            "partNumber": 123
        };
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(201);
        expect(res.body.color).toStrictEqual(data.color);
    });

    test('It should not be possible to create a new device without mandatory fields', async () => {
        const data = {};
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(400);
        expect(res.text).toEqual("The following fields cannot be null: color,partNumber,categoryId");
    });

    test('It should not be possible to create a new device with invalid color length', async () => {
        const data = {
            "category": category.id,
            "color": "12345678901234567",
            "partNumber": 123
        };
        const res = await request(server)
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .expect(400);
        expect(res.text).toEqual("Data too long for column 'color' at row 1");
    });
    
})