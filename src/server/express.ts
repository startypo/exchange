import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from'cookie-parser';
import * as favicon from 'serve-favicon';

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
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(express.static(path.resolve('dist', 'public')));
  }

  private configRoutes(): void {

    this.express.get('/', (req, res) => {
      res.type('text/html');
      res.sendFile('index.html', { root: path.resolve('dist', 'public') });
    });

    this.express.use('/api', (req, res) => {
        res.send('{ "teste" : "JSON" }');
    });
  }

  private configErrorHandler(): void {

    // catch 404 and forward to error handler
    this.express.use((req: any, res: any , next: any) => {
      let err: any = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.express.use((err: any, req: any, res: any , next: any) => {

      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

  }

}

export default new Express().express;
