import { validate } from '../../helpers/validator'

import * as validators from '../../validators/user'
import * as types from '../../types/user'

import { UserModel } from '../../../database/models/user'
import { errorHelper, userReturnFormat } from './common'

export async function getUser(data: object) {
    const value = validate(data, validators.getUser) as types.getUser

    const user = (await UserModel.findOne(value, userReturnFormat))?._doc
    errorHelper.getError(user)
    return user
}

export async function getUsers(data: object) {
    const value = validate(data, validators.getUsers) as types.getUsers

    var users
    if (value.ids) {
        users = await UserModel.find({ id: { $in: value.ids } }, userReturnFormat)
    } else {
        users = await UserModel.find(value, userReturnFormat)
    }
    errorHelper.getAllError(users)

    return users.map((item) => item._doc)
}

export async function getUsersByName(params: any) {
    const value = validate(params, validators.getUsersByName) as types.getUsersByName

    const returnFormat = {
        name: 1,
        surname: 1,
        id: 1,
        _id: 0
    }
    //starts with string
    const users = await UserModel.find({ name: { $regex: '^' + value.string, $options: 'i' } }, returnFormat)

    errorHelper.getAllError(users)

    return users.map((item) => item._doc)
}
