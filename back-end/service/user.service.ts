import { User } from "../model/user";
import UserDb from "../repository/user.db";

const getAllUsers = async (): Promise<User[]> => await UserDb.getAllUsers();

const getUserById = async (id : number): Promise<User> => {
    const user = await UserDb.getUserById({id})
    if (!user) throw new Error(`user with id ${id} does not exist.`);
    return user
};

export default {
    getAllUsers,
    getUserById
}