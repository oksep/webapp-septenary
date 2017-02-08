import { Router, Response, Request } from 'express';
import * as path from 'path';
path.resolve(__dirname, '..', '..');

const publicRouter: Router = Router();

publicRouter.get('/simple', (request: Request, response: Response) => {
  response.json({
    title: 'Greetings.',
    text: 'Hello Angular 2',
    msg: __dirname
  });
});

publicRouter.get('/', (request: Request, response: Response) => {
	response.sendFile(path.join(__dirname, '/../public/stylesheets/style.css'));
})

export { publicRouter }
