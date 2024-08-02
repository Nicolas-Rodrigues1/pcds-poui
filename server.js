import jsonServer from 'json-server';
import cors from 'cors';
import customMiddleware from './middleware.js';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(customMiddleware);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
