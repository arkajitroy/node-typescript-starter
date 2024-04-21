import { TObjectId } from '../others/TObjectId'

export interface IUserSchema extends Document {
    username: string
    password: string
    email: string
    firstName?: string
    lastName?: string
    mobile?: number
    address?: string
    profile?: string
}

export interface TUser extends IUserSchema, TObjectId {}
