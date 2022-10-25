import request from 'supertest';
import app from '../app';
import projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

const correctId = '63580774bc5b0634809b67d5';
const correctIdPut = '6357ee1efc13ae37e7000aa6';
const wrongId = 'asd';

const mockedProject = {
  name: 'Barthel',
  description: 'ac est lacinia nisi venenatis tristique',
  clientName: 'Maximiliano',
};

const wrongMockedProject = {
  description: 'ac est lacinia nisi venenatis tristique',
  clientName: 'Maximiliano',
};

const notValidMockedProject = {
  clientName: '',
};

beforeAll(async () => {
  await projects.collection.insertMany(projectsSeed);
});

describe('GET /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('should return 404 if endpoint was not found', async () => {
    const response = await request(app).get('/projs').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});

describe('GET /projectById', () => {
  test('should return status 200', async () => {
    const response = await request(app).get(`/projects/${correctId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('should return satus 400, so the request is wrong', async () => {
    const response = await request(app).get(`/projects/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return satus 404, so the object not exists', async () => {
    const response = await request(app).get(`/projects/${'63575b52fc13ae2eee000005'}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /projects', () => {
  test('should create a project and return 201', async () => {
    const response = await request(app).post('/projects').send(mockedProject);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('should not create a project and return 400', async () => {
    const response = await request(app).post('/projects').send(wrongMockedProject);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
  });
});

describe('DELETE /projects', () => {
  test('should delete a project and return status 204', async () => {
    const response = await request(app).delete(`/projects/${correctId}`).send();
    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
  test('should not delete a project and return status 400', async () => {
    const response = await request(app).delete(`/projects/${wrongId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should not delete a project and return status 404', async () => {
    const response = await request(app).delete(`/projects/${'63575b52fc13ae2eee000005'}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('PUT /projects', () => {
  test('should edit a project and return status 201', async () => {
    const response = await request(app).put(`/projects/${correctIdPut}`).send(mockedProject);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('should not edit a project and return status 400', async () => {
    const response = await request(app).put(`/projects/${wrongId}`).send(mockedProject);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  })
  test('should not edit a project because it was deleted', async () => {
    const response = await request(app).put(`/projects/${correctId}`).send(mockedProject);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  })
  test('should not edit a project because is not valid', async () => {
    const response = await request(app).put(`/projects/${correctIdPut}`).send(notValidMockedProject);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
})
