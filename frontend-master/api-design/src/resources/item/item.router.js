import { Router } from 'express'
import controllers from './item.controllers'

const router = new Router()

// /api/item
router.route('/').get(controllers.getOne).post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
