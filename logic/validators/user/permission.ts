import * as Joi from 'joi'
import { id } from './common'

export const addPermission = Joi.object({
    id: id.required(),
    permissionPath: Joi.array().items(Joi.string()).required()
})

export const removePermission = Joi.object({
    id: id.required(),
    permissionPath: Joi.array().items(Joi.string()).required()
})

export const getPermission = Joi.object({
    id: id.required()
})

export const getPermissions = Joi.object({
    ids: Joi.array().items(id).required()
})
