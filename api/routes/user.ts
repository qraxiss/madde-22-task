import { Router } from 'express'

import { UserController } from '../controllers/user'

import { requireAcces } from '../middlewares/access'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/decode', UserController.getToken)

router.get('/user', requireAcces(['user', 'read']), UserController.getUser)
router.get('/users', requireAcces(['user', 'read', 'all']), UserController.getUsers)
router.get('/users/name', requireAcces(['user', 'read', 'all']), UserController.getUsersByName)

router.post('/addPermission', requireAcces(['user', 'create']), UserController.addPermission)
router.post('/removePermission', requireAcces(['user', 'delete']), UserController.removePermission)

export { router }
