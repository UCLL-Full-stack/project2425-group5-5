import { UnauthorizedError } from "express-jwt";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import UserDb from "../repository/user.db";
import { AuthenticationResponse, UserInput, UserType } from "../types";
import { generateJwtToken } from '../util/jwt';
import bcrypt from 'bcrypt'

const getAllUsers = async ({ username, usertype }: {username: string; usertype: UserType}): Promise<User[]> => {
    if (usertype === 'admin') {
        return await UserDb.getAllUsers(); 
    } else if (usertype === 'user') {
        const user = await userDb.getUserByName({username})
        return [user!];
    } else {
        throw new UnauthorizedError("credentials_required", {message: "you are not authorized to view this source"}, )
    }
}

const getUserById = async (id : number): Promise<User> => {
    const user = await UserDb.getUserById({id})
    if (!user) throw new Error(`user with id ${id} does not exist.`);
    return user
};

const getUserByName = async (username : string): Promise<User | null> => {
    const user = await UserDb.getUserByName({username})
    return user
};

const createUser =  async ({
    id,
    username,
    password,
    usertype,
}: UserInput): Promise<User> => {
    if (!username || !password || !usertype) throw new Error('Please fill in all information.');
    const existinguser = await getUserByName(username)
    if (existinguser) throw new Error('User with name already exists');
    const hashedpassword = await bcrypt.hash(password, 12);
    const user = new User({id, username, password: hashedpassword, usertype});
    return userDb.createUser(user);
};

const authenticate = async({username, password}:UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByName( username )
    if(!user) throw new Error('User does not exist')

    const isValidPassword = await bcrypt.compare(password, user.getPassword())

    if (!isValidPassword) {
        throw new Error('incorrect password');
    }
    return {
        token: generateJwtToken({username, usertype: user.getUserType()}),
        username: username,
        usertype: user.getUserType()
    }
}

export default {
    createUser,
    getAllUsers,
    getUserByName,
    getUserById,
    authenticate
}