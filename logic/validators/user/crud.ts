import * as Joi from 'joi'

import { objectId, id } from './common'

export const getUser = Joi.object({
    query: Joi.object({
        id: id.required()
    }).required()
})

export const getUsers = Joi.object({
    query: Joi.object({
        ids: Joi.array().items(id)
    }).required()
})

export const user = Joi.object({
    id: objectId().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    username: Joi.string().required(),

    // all fields are optional
    permissions: Joi.any()
})

export const getUsersByName = Joi.object({
    query: Joi.object({
        string: Joi.string().required()
    }).required()
})
