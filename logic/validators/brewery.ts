import Joi from 'joi'

export const middleware = Joi.object({
    path: Joi.string().required(),
    method: Joi.string().required(),
    query: Joi.object().required(),
    body: Joi.object().required(),
    headers: Joi.object().required()
})
