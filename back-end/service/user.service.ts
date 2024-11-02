import { User } from "../model/user";
import UserDb from "../repository/user.db";

const getAllUsers = (): User[] => UserDb.getAllUsers();

const getUserById = (id : number): User => {
    const user = UserDb.getUserById({id})
    if (!user) throw new Error(`user with id ${id} does not exist.`);
    return user
};

export default {
    getAllUsers,
    getUserById
}