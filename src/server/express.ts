import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from'cookie-parser';
import * as favicon from 'serve-favicon';
import passport from './passport';

import { Request, Response, NextFunction } from 'express';
import{ ApiRoutes } from './api.routes';

class Express {

  public express: express.Application;

  constructor() {

    this.express = express();
    this.configMiddleware();
    this.configRoutes();
    this.configErrorHandler();
  }

  private configMiddleware(): void {

    this.express.use(favicon(path.resolve('dist', 'public', 'assets', 'icon', 'favicon.ico')));
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(express.static(path.resolve('dist', 'public')));
    this.express.use(passport.initialize());
  }

  private configRoutes(): void {

    this.express.get('/', (req, res) => {
      res.type('text/html');
      res.sendFile('index.html', { root: path.resolve('dist', 'public') });
    });

    ApiRoutes.config(this.express);
  }

  private configErrorHandler(): void {

    // catch 404 and forward to error handler
    this.express.use((req: any, res: any , next: any) => {
      let err: any = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.express.use((err: Error, req: Request, res: Response , next: NextFunction) => {

      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = err; //req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(500);
      res.json({ name: err.name, msg: err.message, stack : err.stack });
    });
  }
}

export default new Express().express;
