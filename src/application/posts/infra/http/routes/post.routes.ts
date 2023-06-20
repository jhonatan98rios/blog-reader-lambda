import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const postRouter = Router()
const postController = new PostController()

postRouter.get('/', postController.readAll)

postRouter.get('/:slug', postController.readOne)

export default postRouter