import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { UserMock } from './mocks';

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota "/login"', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(UserMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Valida status de campo email vazio igual 401', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })

    expect(chaiHttpResponse.status).equal(401);
  });

  it('Valida mensagem de campo email vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })

    expect(chaiHttpResponse.body).contains({ message: "All fields must be filled"});
  });

  it('Valida status de campo password vazio igual 401', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: "admin@admin.com" })

    expect(chaiHttpResponse.status).equal(401);
  });

  it('Valida mensagem de campo password vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: "admin@admin.com" })

    expect(chaiHttpResponse.body).contains({ message: "All fields must be filled"});
  });

  it('Valida se é possível realizar um login com sucesso com status 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ 
         email: "admin@admin.com",
         password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
        })

    expect(chaiHttpResponse.status).equal(200);
  });

  it('Valida se é possível realizar um login com sucesso com retrno de um objeto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ 
         email: "admin@admin.com",
         password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
        })

    expect(chaiHttpResponse.body).to.be.a('object');
  });
});

describe('Teste rota "/login/validate"', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(UserMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Valida acesso sem token', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')

    expect(chaiHttpResponse.status).equal(401);
  });

});

describe('Teste rota "/clubs"', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(UserMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Valida status da rota "/clubs"', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs')

    expect(chaiHttpResponse.status).equal(200);
  });

  it('Valida retorno da rota "/clubs" como array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs')

    expect(chaiHttpResponse.body).to.be.a('array');
  });

});

describe('Teste rota "/clubs/:id"', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(UserMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Valida status da rota "/clubs/2"', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs/2')

    expect(chaiHttpResponse.status).equal(200);
  });

  it('Valida retorno da rota "/clubs/2" como array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs/2')

    expect(chaiHttpResponse.body).contains({ id: 2, clubName: "Bahia" });
  });

});