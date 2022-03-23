import * as express from 'express';
import UserController from './database/controller/User';
import UserValidation from './middlewares/userValidate';
import Token from './middlewares/tokenValidate';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.get(
      '/login/validate',
      Token.decode,
      UserController.loginValidate,
    )
    this.app.post(
      '/login',
      UserValidation.email,
      UserValidation.password,
      UserValidation.login,
      UserController.login
    );
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
