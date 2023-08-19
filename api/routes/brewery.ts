import { BreweryController } from '../controllers/brewery'
import { Router } from 'express'

export const router = Router()

router.use('/middleware', BreweryController.middleware)
