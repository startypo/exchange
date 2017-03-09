import * as express from 'express';
import { UsersController } from './controllers/users';

let routes = express.Router();

let userController = new UsersController();

routes.route('/users')
      .get(userController.get);

module.exports = routes;
