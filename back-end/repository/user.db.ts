import { User } from "../model/user";
import { Prisma } from "@prisma/client";
import database from "./database";



const getUserById = async({id} : {id: number}) : Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({ where: { id }, });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllUsers = async () : Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma))
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{
    getUserById,
    getAllUsers
}