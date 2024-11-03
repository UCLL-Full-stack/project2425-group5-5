type UserType = 'admin' | 'user'

export type User = {
    id?: number;
    username: string;
    password: string;
    usertype: UserType;
}

export type BugReport = {
    id?: number;
    user: User;
    title: string;
    description: string;
    resolved: boolean;
}