import request from 'supertest';
import app from 'src';

describe('App Endpoint', () => {
  it('should get app HTML code', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toMatch(/<div id="root"><\/div>/gm);
  });

  it('should get app HTML code if page not exist', async () => {
    const res = await request(app).get('/probably-not-exists');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toMatch(/<div id="root"><\/div>/gm);
  });
})