/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const App = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);

const { expect } = chai;
const newUser = {
  username: 'developer',
  email: 'dev.emailtest404@gmail.com',
  password: 'abc123ABC',
};

describe('/api/user', () => {
  let chaiHttpResponse;

  before(async () => {
    sinon
      .stub(User, 'create')
      .resolves([{ insertId: 1 }]);
  });

  after(async () => {
    User.create.restore();
  });

  it('success when trying to create a new user', async () => {
    chaiHttpResponse = await chai
      .request(App)
      .post('/api/user')
      .send(newUser);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.have.property('status');
    expect(chaiHttpResponse.body.message).to.be.equal('created');
  });
});
