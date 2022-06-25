/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const App = require('../../app');
const User = require('../../models/User');

chai.use(chaiHttp);

const { expect } = chai;
const newUser = {
  username: 'developer',
  email: 'dev.emailtest404@gmail.com',
  password: 'abc123ABC',
};

describe('POST /api/users', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(async () => {
      sinon
        .stub(User, 'create')
        .resolves({
          id: 1,
        });

      sinon
        .stub(User, 'findOne')
        .resolves(null);
    });

    after(async () => {
      User.create.restore();
      User.findOne.restore();
    });

    it('success when trying to create a new account', async () => {
      const { username, email } = newUser;
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send(newUser);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.deep.equal({
        id: 1,
        username,
        email,
      });
    });
  });

  describe('- Invalid fields', () => {
    it('fails when user is trying to create a new account without username filled.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          email: newUser.email,
          password: newUser.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('fails when user is trying to create a new account with a username that is not big enough.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          username: 'test',
          email: newUser.email,
          password: newUser.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: '"username" length must be equal or greater than 6' });
    });

    it('fails when user is trying to create a new account without email filled.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          username: newUser.username,
          password: newUser.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('fails when user is trying to create a new account with a invalid email address.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          username: newUser.username,
          email: 'dev.dev.com',
          password: newUser.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Please provide a valid email adress' });
    });

    it('fails when user is  trying to create a new account without password filled.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          username: newUser.username,
          email: newUser.email,
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('fails when user is  trying to create a new account with a password that is not big enough.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          username: newUser.username,
          email: newUser.email,
          password: '1234',
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: '"password" length must be equal or greater than 8' });
    });
  });

  describe('- Email already used.', () => {
    let chaiHttpResponse;

    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'developer',
          email: 'dev.emailtest404@gmail.com',
          password: 'xxxxxxxx',
        });
    });

    after(async () => {
      User.findOne.restore();
    });

    it('fails if user is trying  to create an account with an email already used.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send({
          username: newUser.username,
          email: newUser.email,
          password: '12345678',
        });

      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'email already used' });
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong...');
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .throws(error);
    });
    after(async () => {
      User.findOne.restore();
    });

    it('unexpected problem event.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/users')
        .send(newUser);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
