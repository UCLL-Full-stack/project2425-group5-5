import { User } from "../model/user";
import userDb from "../repository/user.db";
import UserDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import { generateJwtToken } from '../util/jwt';
import bcrypt from 'bcrypt'

const getAllUsers = async (): Promise<User[]> => await UserDb.getAllUsers();

const getUserById = async (id : number): Promise<User> => {
    const user = await UserDb.getUserById({id})
    if (!user) throw new Error(`user with id ${id} does not exist.`);
    return user
};

const getUserByName = async (username : string): Promise<User | undefined> => {
    const user = (await UserDb.getUserByName({username})).at(0)
    return user
};

const createUser =  async ({
    id,
    username,
    password,
    usertype,
}: UserInput): Promise<User> => {
    if (!username || !password || !usertype) throw new Error('Please fill in all information.');
    if ((await getUserByName(username))) throw new Error('User with name already exists');
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