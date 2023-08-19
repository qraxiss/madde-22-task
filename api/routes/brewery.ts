import { BreweryController } from '../controllers/brewery'
import { Router } from 'express'

const router = Router()

router.get('/middleware', BreweryController.middleware)
