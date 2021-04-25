const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('test video page', () => {
	it('should return an error', (done) => {
		server.get('/video?v=a').expect('content-type', /text/).expect(200).end((err, res) => {
			done();
		});
	});
});

describe('test channel page', () => {
	it('should return an error', (done) => {
		server.get('/channel?q=a').expect('content-type', /text/).expect(200).end((err, res) => {
			done();
		});
	});
});

describe('test search page', () => {
	it('should return results', (done) => {
		server.get('/search?q=a').expect('content-type', /text/).expect(200).end((err, res) => {
			done();
		});
	});
});

describe('test proxy', () => {
	it('should error', (done) => {
		server.get('/proxy/video?q=https://inspare.cc').expect('content-type', /text/).expect(200).end((err, res) => {
			done();
		});
	});
});