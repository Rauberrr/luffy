/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import PostController from './Controllers/PostController'
import CommentController from './Controllers/CommentController'
import UserController from './Controllers/UserController'
import LikeController from './Controllers/LikeController'

const routes = Router()

// UserController

routes.post('/create-user', UserController.create)
routes.post('/login-user', UserController.login)

// PostController

routes.get('/posts', PostController.list)
// routes.post('/list-luffies', PostController.luffies)
routes.post('/post', PostController.create)
routes.put('/post/:postId', PostController.update)
routes.delete('/post/:postId', PostController.delete)

// CommentController

routes.get('/comments/:postId', CommentController.list)
routes.post('/comments/:postId', CommentController.insert)
routes.put('/comments/:postId/:commentId', CommentController.update)
routes.delete('/comments/:postId/:commentId', CommentController.delete)

// LikeController

routes.get('/likes/:postId', LikeController.list)
routes.get('/likes/:commentId', LikeController.listComments)
routes.post('/likes/:postId/:commentId', LikeController.insertComments)
routes.post('/likes/:postId', LikeController.insert)
routes.delete('/likes/:postId', LikeController.delete)

export default routes
