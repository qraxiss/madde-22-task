import * as validators from '../validators/brewery'
import * as types from '../types/brewery'
import { validate } from '../helpers/validator'

import axios from 'axios'

export async function middleware(params: types.middleware) {
    params = validate(params, validators.middleware) as types.middleware

    const response = await axios.request({ ...params, url: 'https://api.openbrewerydb.org/v1/breweries' + params.path })

    return {
        data: response.data,
        status: response.status
    }
}
