import * as validators from '../validators/brewery'
import * as types from '../types/brewery'
import { validate } from '../helpers/validator'

import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.openbrewerydb.org/v1/breweries'
})

export async function middleware(params: types.middleware) {
    params = validate(params, validators.middleware) as types.middleware
    const response = await instance.request({
        url: params.path,
        method: params.method,
        params: params.query,
        data: params.body
    })

    return {
        data: response.data,
        status: response.status
    }
}
