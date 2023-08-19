import { validate } from '../../helpers/validator'
import * as validators from '../../validators/user'
import * as types from '../../types/user'

import { UserModel } from '../../../database/models/user'
import { getUser } from './get'

import { errorHelper } from './common'

export async function addPermission(params: types.addPermission) {
    params = validate(params, validators.addPermission)
    const user = await getUser({
        query: { id: params.query.id }
    })

    let tempPermissions = user.permissions
    let permissionAdded = false

    params.body.permissionPath.forEach((item, index) => {
        if (!tempPermissions[item]) {
            if (index === params.body.permissionPath.length - 1) {
                tempPermissions[item] = {}
                permissionAdded = true
            } else {
                const requiredPermissions = params.body.permissionPath.slice(0, index + 1).join('->')
                const userPermissions = params.body.permissionPath.slice(0, index).join('->')

                throw new Error(
                    `${params.body.permissionPath[index]} permission requires ${requiredPermissions} permission, users have: ${userPermissions}`
                )
            }
        }

        tempPermissions = tempPermissions[item]
    })

    const result = await UserModel.updateOne({ id: params.query.id }, { permissions: user.permissions })
    errorHelper.updateError(result)

    if (!permissionAdded) {
        throw new Error('Permission already exist!')
    }

    return permissionAdded
}

export async function removePermission(params: types.removePermission) {
    params = validate(params, validators.removePermission)
    const user = await getUser({
        query: { id: params.query.id }
    })
    let tempPermissions = user.permissions
    let permissionRemoved = false

    params.body.permissionPath.forEach((item, index) => {
        if (!tempPermissions[item]) {
            throw new Error('Permission not exist!')
        }

        if (index == params.body.permissionPath.length - 1) {
            delete tempPermissions[item]
            permissionRemoved = true
        }
        tempPermissions = tempPermissions[item]
    })

    const result = await UserModel.updateOne({ id: params.query.id }, { permissions: user.permissions })
    errorHelper.updateError(result)

    return permissionRemoved
}

export async function getPermissions(params: any) {
    params = validate(params, validators.getPermission) as types.getPermission
    const user = await UserModel.findOne(
        { id: params.id },
        {
            permissions: 1,
            _id: 0
        }
    )
    errorHelper.getError(user)

    return user!.permissions
}
