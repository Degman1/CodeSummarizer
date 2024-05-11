const request = require('supertest');
const app = require('server.js');

describe('Test API endpoints', () => {
  it('Check it is running', async () => {
    const response = await request(app).get('/status');
    expect(response.statusCode).toBe(200);
    expect(response.body.Status).toBe('Running');
  });

  it('Check new user addition', async () => {
    const response = await request(app)
      .post('/add_user')
      .query({ username: 'test_user', admin: 'TRUE' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('User Successfully Created');
  });

  it('Check remove user after add user', async () => {
    await request(app)
      .post('/add_user')
      .query({ username: 'test_user', admin: 'TRUE' });
    const response = await request(app)
      .delete('/remove_user')
      .query({ username: 'test_user' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('User Successfully Deleted');
  });

  it('Chekc information about user', async () => {
    const response = await request(app)
      .get('/user_information')
      .query({ username: 'test_user' });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Check getting all account information', async () => {
    const response = await request(app).get('/all_user_information');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Check summary requests for test user', async () => {
    const response = await request(app)
      .get('/get_user_requests')
      .query({ username: 'test_user' });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Check getting a user\'s responses', async () => {
    const response = await request(app)
      .get('/get_responses')
      .query({ request_id: 'test_request_id' });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Test submitting a request', async () => {
    const response = await request(app)
      .post('/submit_request')
      .field('username', 'test_user')
      .field('programming_language', 'JavaScript')
      .field('title', 'Test Summary')
      .field('description', 'Testing summary submission')
      .attach('prompt', 'path/to/prompt/file');
    expect(response.statusCode).toBe(200);
    expect(response.body.request.length).toBeGreaterThan(0);
    expect(response.body.responses.length).toBeGreaterThan(0);
  });

  it('Test submitting a rating', async () => {
    const response = await request(app)
      .post('/rate_response')
      .send({ response_id: 'test_response_id', rating: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Rating Succeeded');
  });

  it('check fetchin user stats', async () => {
    const response = await request(app)
      .get('/user_statistics')
      .query({ username: 'test_user' });
    expect(response.statusCode).toBe(200);
  });

  it('Check getting combined stats', async () => {
    const response = await request(app).get('/combined_statistics');
    expect(response.statusCode).toBe(200);
  });
});
