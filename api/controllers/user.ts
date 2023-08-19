import * as userLogic from '../../logic/models/user'
import { ahandler } from '../../errors/handle'

import { formatter } from './returnFormat'

import * as error from '../../errors/errors'

export class UserController {
    @ahandler
    static async register(req: any, res: any) {
        if (req.session.user) throw new error.SessionError('Register while logged in')

        res.json(
            formatter(
                await userLogic.register({
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async login(req: any, res: any) {
        if (req.session.user) throw new error.SessionError('Login while logged in')

        req.session.user = await userLogic.login(req.body)

        res.json(
            formatter(
                await userLogic.login({
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async getUser(req: any, res: any) {
        res.json(
            formatter(
                await userLogic.getUser({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async getUsers(req: any, res: any) {
        res.json(
            formatter(
                await userLogic.getUsers({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async getUsersByName(req: any, res: any) {
        res.json(
            formatter(
                await userLogic.getUsersByName({
                    query: req.query
                })
            )
        )
    }

    @ahandler
    static async addPermission(req: any, res: any) {
        res.json(
            formatter(
                await userLogic.addPermission({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async removePermission(req: any, res: any) {
        res.json(
            formatter(
                await userLogic.removePermission({
                    query: req.query,
                    body: req.body
                })
            )
        )
    }

    @ahandler
    static async logout(req: any, res: any, next: any) {
        if (!req.session.user) throw new error.SessionError('Logout without login')

        req.session.destroy()
        return res.json(true)
    }

    @ahandler
    static async getToken(req: any, res: any) {
        res.json(formatter(await userLogic.getUserFromToken(req.body.token)))
    }
}
