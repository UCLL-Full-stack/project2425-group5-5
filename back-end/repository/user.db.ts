import { User } from "../model/user";
import { Prisma } from "@prisma/client";
import database from "./database";

const createUser = async (user : User): Promise<User> => {
    try{
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                usertype: user.getUserType(),   
            },
        })
        return User.from(userPrisma)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const getUserById = async({id} : {id: number}) : Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({ where: { id }, });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByName = async({username} : {username: string}) : Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({ where: { username }, });
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
    createUser,
    getUserById,
    getAllUsers,
    getUserByName
}