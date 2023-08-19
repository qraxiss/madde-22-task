import Joi from 'joi'
import { joiObjectId } from 'ts-joi-objectid'

export const objectId = joiObjectId(Joi)
export const id = Joi.string().regex(/\d{5}$/)
export const socialSecurityNumber = Joi.string().regex(/^[1-9]{1}[0-9]{9}[02468]{1}$/)
export const email = Joi.string().email()
export const phone = Joi.string().regex(/(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/)
