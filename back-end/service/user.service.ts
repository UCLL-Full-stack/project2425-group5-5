import { User } from "../model/user";
import userDb from "../repository/user.db";
import UserDb from "../repository/user.db";
import { UserInput } from "../types";

const getAllUsers = async (): Promise<User[]> => await UserDb.getAllUsers();

const getUserById = async (id : number): Promise<User> => {
    const user = await UserDb.getUserById({id})
    if (!user) throw new Error(`user with id ${id} does not exist.`);
    return user
};

const getUserByName = async (username : string): Promise<User[]> => {
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
    if ((await getUserByName(username)).length > 0) throw new Error('User with name already exists');
    const user = new User({id, username, password, usertype});
    return userDb.createUser(user);
};

export default {
    createUser,
    getAllUsers,
    getUserByName,
    getUserById
}