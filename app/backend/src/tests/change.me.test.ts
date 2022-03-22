import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { UserMock } from './mocks';

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(UserMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Valida status de campo email vazio igual 400', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })

    expect(chaiHttpResponse.status).equal(400);
  });

  it('Valida mensagem de campo email vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })

    expect(chaiHttpResponse.body).contains({ message: "Email is not empty"});
  });

  it('Valida status de campo password vazio igual 400', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: "admin@admin.com" })

    expect(chaiHttpResponse.status).equal(400);
  });

  it('Valida mensagem de campo password vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: "admin@admin.com" })

    expect(chaiHttpResponse.body).contains({ message: "Password is not empty"});
  });

  it('Valida se é possível realizar um login com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ 
         email: "admin@admin.com",
         password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
        })

    expect(chaiHttpResponse.status).equal(200);
  });
});