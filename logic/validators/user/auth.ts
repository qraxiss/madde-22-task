import * as Joi from 'joi'

import { email, phone, id } from './common'

export const login = Joi.object({
    email: email.required(),
    password: Joi.string().required()
})

export const register = Joi.object({
    email: email.required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    phone: phone.required(),
    birthDate: Joi.date().required(),
    id: id
})

export const getToken = Joi.object({
    id: id.required(),
    moduleName: Joi.string().required()
})
