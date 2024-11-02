import { UserType } from "../types";

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
}