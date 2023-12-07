/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import PostController from './Controllers/PostController'
import OtherController from './Controllers/OtherController'

const routes = Router()

// PostController

routes.get('/list-posts', PostController.list)
routes.post('/create-post', PostController.create)
routes.put('/update-post/:id', PostController.update)
routes.delete('/delete-post/:id', PostController.delete)

// OtherController

routes.get('/list-others', OtherController.list)
routes.post('/insert-others/:postId', OtherController.insert)
routes.put('/update-others/:postId/:id', OtherController.update)
routes.delete('/delete-others/:id', OtherController.delete)

export default routes
