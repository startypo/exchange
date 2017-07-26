import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as favicon from 'serve-favicon';
import * as compression from 'compression';
import { Request, Response, NextFunction } from 'express';

import passport from './passport';
import { RoutesMap } from './routes.map';
import { Config } from './config';

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
    this.express.use(compression());
    this.express.use(favicon(path.join(Config.execPath, 'public', 'assets', 'icon', 'favicon.ico')));
    this.express.use(express.static(path.join(Config.execPath, 'public')));
    this.express.use(bodyParser.json({ limit: '6mb' }));
    this.express.use(bodyParser.urlencoded({ limit: '12mb', extended: true }));
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
  }

  private configRoutes(): void {

    this.express.get('/', (req, res) => {
      res.type('text/html');
      res.sendFile(path.join(Config.execPath, 'index.html'));
    });

    this.express.use('/api/v1', RoutesMap.map());
  }

  private configErrorHandler(): void {

    // catch 404 and forward to error handler
    this.express.use((req: any, res: any , next: any) => {
      const err: any = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.express.use((err: any, req: Request, res: Response , next: NextFunction) => {

      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'local' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ name: err.name, msg: err.message, stack : err.stack });
    });
  }
}

export default new Express().express;
