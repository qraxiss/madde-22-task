import { validate } from '../../helpers/validator'
import * as validators from '../../validators/user'
import * as types from '../../types/user'

import { UserModel } from '../../../database/models/user'

import bcrypt from 'bcrypt'

import { filter } from '../../helpers/filter'

import { errorHelper, userReturnFormat } from './common'

import { decode, encode } from '../../helpers/JWT'

export async function register(params: types.register) {
    params = validate(params, validators.register)

    const salt = await bcrypt.genSalt(10)
    params.body.password = await bcrypt.hash(params.body.password, salt)

    var user = (await UserModel.create(params.body)).toObject() as any
    errorHelper.createError(user)

    user = await UserModel.findById(user._id, userReturnFormat)
    errorHelper.getError(user)
    return !!user
}

export async function login(params: types.login) {
    params = validate(params, validators.login)

    var user = await UserModel.findOne({ username: params.body.username }, { ...userReturnFormat, password: 1 })
    errorHelper.getError(user)

    if (!(await bcrypt.compare(params.body.password, user!.password))) {
        throw new Error('password not valid')
    }

    return {
        token: encode(user!.toObject())
    }
}

export function getUserFromToken(token: string) {
    const result = decode(token)
    let { iat, exp, ...data } = result

    return data
}
