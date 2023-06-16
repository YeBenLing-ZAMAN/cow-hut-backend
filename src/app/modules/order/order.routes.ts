import express from 'express'
import { OrderController } from './order.controllers'
const router = express.Router()

router.post(
  '/order-create',
  //   requestValidation.validateRequest(UserValidation.createUserZodSchema),
  OrderController.createOrders
)
router.get('/', OrderController.getAllOrders)

export const OrderRoutes = router
