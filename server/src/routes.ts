/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import PostController from './Controllers/PostController'
import CommentController from './Controllers/CommentController'
import UserController from './Controllers/UserController'
import LikeController from './Controllers/LikeController'
import multer from 'multer'
import { storage } from './config/multer'

const routes = Router()
const upload = multer({ storage })

// UserControllers

routes.post('/img/:userId', upload.single('file'), UserController.uploadImg)
// routes.get('/img/:userId', UserController.listImage)

routes.post('/create-user', UserController.create)
routes.post('/login-user', UserController.login)
routes.get('/listUsers', UserController.listUsers)

// PostController

routes.get('/posts', PostController.list)
routes.get('/posts/:postId', PostController.listId)
routes.get('/posts/userId/:userId', PostController.listUserId)
routes.get('/posts/userId/likes/:userId', PostController.listUserIdLikes)
routes.post('/post', PostController.create)
routes.put('/post/:postId', PostController.update)
routes.delete('/post/:postId', PostController.delete)

// CommentController
routes.get('/comments/', CommentController.listall)
routes.get('/comments/:postId', CommentController.list)
routes.post('/comments/:postId', CommentController.insert)
routes.put('/comments/:postId/:commentId', CommentController.update)
routes.delete('/comments/:postId/:commentId', CommentController.delete)

// LikeController

routes.get('/likes/postId/:postId', LikeController.listPostId)
routes.get('/likes/userId/:userId', LikeController.listUserId)
routes.get('/likes/comments/:commentId', LikeController.listComments)
routes.post('/likes/:postId/:commentId', LikeController.insertComments)
routes.post('/likes/:postId', LikeController.insert)
routes.delete('/likes/:postId', LikeController.delete)

export default routes
