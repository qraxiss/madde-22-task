import * as Joi from 'joi'

import { objectId, id } from './common'

export const getUser = Joi.object({
    id: id.required()
})

export const getUsers = Joi.object({
    ids: Joi.array().items(id)
})

export const user = Joi.object({
    id: objectId().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),

    // all fields are optional
    permissions: Joi.any()
})

export const getUsersByName = Joi.object({
    string: Joi.string().required()
})
