import * as debug from 'debug';
import * as http from 'http';
import Express from './express';

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3001);
Express.set('port', port);

const server = http.createServer(Express);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
  let p: number = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (isNaN(p))
      return val;
  else if (p >= 0)
    return p;
  else
    return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
