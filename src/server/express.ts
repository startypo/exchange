import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from'cookie-parser';
import * as favicon from 'serve-favicon';
import passport from './passport';

import { Request, Response, NextFunction } from 'express';
import{ RoutesMap } from './routes.map';

class Express {

  public express: express.Application;

  constructor() {

    this.express = express();
    this.configMiddleware();
    this.configRoutes();
    this.configErrorHandler();
  }

  private configMiddleware(): void {

    this.express.use(logger('dev'));
    this.express.use(favicon(path.resolve('public', 'assets', 'icon', 'favicon.ico')));
    this.express.use(express.static(path.resolve('public')));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
  }

  private configRoutes(): void {

    this.express.get('/', (req, res) => {
      res.type('text/html');
      res.sendFile(path.resolve('index.html'));
    });

    this.express.use('/api/v1', RoutesMap.map());
  }

  private configErrorHandler(): void {

    // catch 404 and forward to error handler
    this.express.use((req: any, res: any , next: any) => {
      let err: any = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.express.use((err: any, req: Request, res: Response , next: NextFunction) => {

      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ name: err.name, msg: err.message, stack : err.stack });
    });
  }
}

export default new Express().express;
