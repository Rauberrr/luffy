import { Router } from 'express'

const routes = Router()

routes.get('/', () => {
  console.log('/ its sucessfully')
})

export default routes
