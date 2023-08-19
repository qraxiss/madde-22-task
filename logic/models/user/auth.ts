import { validate } from '../../helpers/validator'
import * as validators from '../../validators/user'
import * as types from '../../types/user'

import { UserModel } from '../../../database/models/user'

import bcrypt from 'bcrypt'

import { filter } from '../../helpers/filter'

import { errorHelper, userReturnFormat } from './common'

export async function register(data: object) {
    const value = validate(data, validators.register) as types.register

    const salt = await bcrypt.genSalt(10)
    value.password = await bcrypt.hash(value.password, salt)

    var user = (await UserModel.create(value)).toObject() as any
    errorHelper.createError(user)

    user = await UserModel.findById(user._id, userReturnFormat)
    errorHelper.getError(user)
    return user
}

export async function login(data: object) {
    const value = validate(data, validators.login) as types.login

    var user = await UserModel.findOne({ email: value.email }, { ...userReturnFormat, password: 1 })
    errorHelper.getError(user)

    if (!(await bcrypt.compare(value.password, user!.password))) {
        throw new Error('password not valid')
    }

    return filter(user!._doc, ['password'])
}

import { decode } from '../../helpers/JWT'

export function getUserFromToken(token: string): types.user {
    const result = decode(token)
    let { iat, exp, ...data } = result
    const value = validate(data, validators.user)

    return value
}
