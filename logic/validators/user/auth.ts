import * as Joi from 'joi'

import { username, phone, id } from './common'

export const login = Joi.object({
    body: Joi.object({
        username: username.required(),
        password: Joi.string().required()
    }).required()
})

export const register = Joi.object({
    body: Joi.object({
        username: username.required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        phone: phone.required(),
        birthDate: Joi.date().required(),
        id: id
    }).required()
})

export const getToken = Joi.object({
    query: Joi.object({
        id: id.required()
    }).required()
})
