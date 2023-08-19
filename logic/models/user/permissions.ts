import { validate } from '../../helpers/validator'
import * as validators from '../../validators/user'
import * as types from '../../types/user'

import { UserModel } from '../../../database/models/user'
import { getUser } from './get'

import { errorHelper } from './common'

export async function addPermission(data: object) {
    const value = validate(data, validators.addPermission) as types.addPermission
    const user = await getUser({ id: value.id })

    let tempPermissions = user.permissions
    let permissionAdded = false

    value.permissionPath.forEach((item, index) => {
        if (!tempPermissions[item]) {
            if (index === value.permissionPath.length - 1) {
                tempPermissions[item] = {}
                permissionAdded = true
            } else {
                const requiredPermissions = value.permissionPath.slice(0, index + 1).join('->')
                const userPermissions = value.permissionPath.slice(0, index).join('->')

                throw new Error(
                    `${value.permissionPath[index]} permission requires ${requiredPermissions} permission, users have: ${userPermissions}`
                )
            }
        }

        tempPermissions = tempPermissions[item]
    })

    const result = await UserModel.updateOne({ id: value.id }, { permissions: user.permissions })
    errorHelper.updateError(result)

    if (!permissionAdded) {
        throw new Error('Permission already exist!')
    }

    return permissionAdded
}

export async function removePermission(data: object) {
    const value = validate(data, validators.removePermission) as types.removePermission
    const user = await getUser({ id: value.id })
    let tempPermissions = user.permissions
    let permissionRemoved = false

    value.permissionPath.forEach((item, index) => {
        if (!tempPermissions[item]) {
            throw new Error('Permission not exist!')
        }

        if (index == value.permissionPath.length - 1) {
            delete tempPermissions[item]
            permissionRemoved = true
        }
        tempPermissions = tempPermissions[item]
    })

    const result = await UserModel.updateOne({ id: value.id }, { permissions: user.permissions })
    errorHelper.updateError(result)

    return permissionRemoved
}

export async function getPermissions(params: any) {
    const value = validate(params, validators.getPermission) as types.getPermission
    const user = await UserModel.findOne(
        { id: value.id },
        {
            permissions: 1,
            _id: 0
        }
    )
    errorHelper.getError(user)

    return user!.permissions
}
