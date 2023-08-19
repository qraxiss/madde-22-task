export * from './auth'
export * from './permission'
export * from './crud'

import Joi from 'joi'

export const user = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    permissions: Joi.any().required()
})
