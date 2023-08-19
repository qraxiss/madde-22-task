import { validate } from '../../helpers/validator'

import * as validators from '../../validators/user'
import * as types from '../../types/user'

import { UserModel } from '../../../database/models/user'
import { errorHelper, userReturnFormat } from './common'

export async function getUser(params: types.getUser) {
    params = validate(params, validators.getUser)

    const user = (await UserModel.findOne(params, userReturnFormat))?._doc
    errorHelper.getError(user)
    return user
}

export async function getUsers(params: types.getUsers) {
    params = validate(params, validators.getUsers)

    var users
    if (params.query.ids) {
        users = await UserModel.find({ id: { $in: params.query.ids } }, userReturnFormat)
    } else {
        users = await UserModel.find(params, userReturnFormat)
    }
    errorHelper.getAllError(users)

    return users.map((item) => item._doc)
}

export async function getUsersByName(params: any) {
    params = validate(params, validators.getUsersByName)

    const returnFormat = {
        name: 1,
        surname: 1,
        id: 1,
        _id: 0
    }
    //starts with string
    const users = await UserModel.find({ name: { $regex: '^' + params.string, $options: 'i' } }, returnFormat)

    errorHelper.getAllError(users)

    return users.map((item) => item._doc)
}
