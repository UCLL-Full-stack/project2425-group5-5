import { User } from "../model/user";

const users = [
    new User({
        id: 1,
        username: "Blahooga",
        password: "blah123",
        usertype: "user"
    }),
]

const getUserById = ({id} : {id: number}) : User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllUsers = () : User[] => {
    try {
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{
    getUserById,
    getAllUsers
}