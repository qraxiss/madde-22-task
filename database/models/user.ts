import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import RandExp from 'randexp'

/**
 * @description User model
 *
 * @class User
 *
 *
 *
 * @property {string} id - User id
 * @property {string} username - User username
 * @property {string} password - User password
 * @property {string} name - User name
 * @property {string} surname - User surname
 * @property {Date} birthDate - User birth date
 * @property {string} phone - User phone number
 * @property {boolean} KVK - User KVK
 * @property {any} permissions - User permissions
 */
@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: true
    },
    options: {
        allowMixed: 0
    }
})
export class User {
    _doc: any
    static idRegex = /\d{5}$/

    /**
     *
     * @description Generate a random register id
     * @returns {string} 12345
     */
    static generateid() {
        return new RandExp(User.idRegex).gen()
    }

    @prop({
        required: true,
        match: [User.idRegex, 'id not valid'],
        default: User.generateid,
        unique: true
    })
    public id!: string // REGEX :

    @prop({ required: true, unique: true })
    public username!: string

    @prop({ required: true })
    public password!: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true })
    public surname!: string

    @prop({ required: true })
    public birthDate!: Date

    @prop({
        required: true,
        unique: true,
        match: [/(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/, 'phone number not valid']
    })
    public phone!: string

    @prop({ required: true, default: true })
    public KVK!: boolean

    @prop({ required: true, default: { user: {} } })
    public permissions!: any
}

export const UserModel = getModelForClass(User)
