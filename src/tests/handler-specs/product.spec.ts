import { IProductBase, IUser } from '@/types';
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Product Handler', () => {
  let user: IUser;
  let token: string;
  let productBase: IProductBase = {
    name: 'product',
    price: 100,
    category: 'category',
  };
  let productId: number | undefined;

  beforeAll(async () => {
    const userResponse = await request.post('/users').send({
      username: 'saul3',
      password: '123',
      firstname: 'Saul',
      lastname: 'Vo',
    });
    user = userResponse.body;

    const loginResponse = await request.post('/login').send({
      username: 'saul3',
      password: '123',
    });
    token = loginResponse.body.token;
  });

  it('should create a product', async () => {
    const res = await request.post('/products').set('Authorization', `Bearer ${token}`).send(productBase);
    const { id } = res.body;
    productId = id;
    expect(res.status).toBe(200);
  });

  it('should get a product', async () => {
    const res = await request.get(`/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  it('should update a product', async () => {
    const updatedProduct = { ...productBase, name: 'updated product' };
    let res = await request.put(`/products/${productId}`).set('Authorization', `Bearer ${token}`).send(updatedProduct);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('updated product');
  });

  it('should delete a product', async () => {
    let res = await request.delete(`/products/${productId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await request.delete(`/users/${user.id}`);
  });
});
