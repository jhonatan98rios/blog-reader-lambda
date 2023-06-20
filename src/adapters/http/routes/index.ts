import { Router } from 'express';
import postRouter from '@posts/infra/http/routes/post.routes';

const routes = Router();

routes.use('/posts', postRouter);

export default routes;