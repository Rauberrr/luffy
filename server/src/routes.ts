/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import PostController from './Controllers/PostController'

const routes = Router()

routes.get('/list-posts', PostController.list)
routes.post('/create-post', PostController.create)
routes.put('/update-post/:id', PostController.update)
routes.delete('/delete-post/:id', PostController.delete)

export default routes
