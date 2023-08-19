import { ErrorHelper } from '../../helpers/error'

export const errorHelper = new ErrorHelper('User')

export const userReturnFormat = {
    username: 1,
    id: 1,
    name: 1,
    surname: 1,
    permissions: 1,
    jobInformation: 1,
    _id: 0
}
