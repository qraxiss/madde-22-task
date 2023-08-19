import * as breweryLogic from '../../logic/models/brewery'
import { ahandler } from '../../errors/handle'

import { formatter } from './returnFormat'

export class BreweryController {
    @ahandler
    static async middleware(req: any, res: any) {
        res.json(
            formatter(
                await breweryLogic.middleware({
                    query: req.query,
                    body: req.body,
                    path: req.path.replace('/middleware', ''),
                    method: req.method,
                    headers: req.headers
                })
            )
        )
    }
}
