import * as sampleLogic from '../../logic/models/user'
import { ahandler } from '../../errors/handle'

import { formatter } from './returnFormat'

export class UserController {
    @ahandler
    static async register(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.register({
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async login(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.login({
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async getUser(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.getUser({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async getUsers(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.getUsers({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async getUsersByName(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.getUsersByName({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async addPermission(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.addPermission({
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async removePermission(req: any, res: any) {
        res.json(
            formatter(
                await sampleLogic.removePermission({
                    body: req.body
                })
            )
        )
    }
}
