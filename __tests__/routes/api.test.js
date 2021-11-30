import request from 'supertest';
import app from 'src';
import { syncAndMigrateDBForTests } from 'src/utils/migrateDB';

beforeEach(syncAndMigrateDBForTests);

describe('Scores Endpoints', () => {
  it('should list scores', async () => {
    const res = await request(app).get('/api/score');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(3);
  });

  it('should failed create a score if has no params', async () => {
    const score = {
      player_1: 1,
      player_2: 2,
      score_date: '2021-11-30 12:00'
    };
    const res = await request(app).post('/api/score').send(score);
    expect(res.statusCode).toEqual(400);
  });
  it('should create a score if has good params', async () => {
    const score = {
      pseudo: 'PSEUDO_4',
      player_1: 1,
      player_2: 2,
      score_date: '2021-11-30 12:00'
    };

    const wantedScore = {
      pseudo: 'PSEUDO_4',
      player_1: 1,
      player_2: 2,
      score_date: '2021-11-30T11:00:00.000Z'
    };
    const res = await request(app).post('/api/score').send(score);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toMatchObject(wantedScore);
  });
})