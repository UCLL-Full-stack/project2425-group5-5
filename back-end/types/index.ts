import { User } from "../model/user";

type UserType = 'admin' | 'user'

type UserInput = {
    id?: number;
    username: string;
    password: string;
    usertype: UserType;
}

type BugReportInput = {
    id?: number;
    user: UserInput;
    title: string;
    description: string;
    resolved: boolean;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    usertype: string;
};

export {
    UserType,
    UserInput,
    BugReportInput,
    AuthenticationResponse,

}