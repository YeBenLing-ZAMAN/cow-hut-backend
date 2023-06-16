import express from 'express'
import { UserRoutes } from '../modules/user/user.routes'
import { CowRoutes } from '../modules/cow/cow.routes'
const router = express.Router()

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/cow', route: CowRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
