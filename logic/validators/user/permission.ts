import * as Joi from 'joi'
import { id } from './common'

export const addPermission = Joi.object({
    query: Joi.object({
        id: id.required()
    }).required(),
    body: Joi.object({
        permissionPath: Joi.array().items(Joi.string()).required()
    }).required()
})

export const removePermission = Joi.object({
    query: Joi.object({
        id: id.required()
    }).required(),
    body: Joi.object({
        permissionPath: Joi.array().items(Joi.string()).required()
    }).required()
})

export const getPermission = Joi.object({
    query: Joi.object({
        id: id.required()
    }).required()
})

export const getPermissions = Joi.object({
    query: Joi.object({
        ids: Joi.array().items(id)
    }).required()
})
