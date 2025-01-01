import { UserType } from "../types";
import { User as userPrisma } from "@prisma/client"

export class User{
    private id?: number;
    private username: string;
    private password: string;
    private usertype: UserType;

    constructor( user: {
        id?: number;
        username: string;
        password: string;
        usertype: UserType;
    }){
        this.validate(user)
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.usertype = user.usertype;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username
    }

    getPassword(): string {
        return this.password
    }

    getUserType(): UserType {
        return this.usertype
    }

    validate( user: {
        id?: number;
        username: string;
        password: string;
        usertype: UserType;
    }){
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }

        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }

        if (user.password.length < 8){
            throw new Error('Password must be a least 8 characters')
        }

        if (!user.usertype){
            throw new Error('Usertype is required')
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.usertype === user.getUserType()
        );
    }

    static from({id, username, password, usertype}: userPrisma) {
        return new User({
            id,
            username,
            password,
            usertype: usertype as UserType
        })
    }
}