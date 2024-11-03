export type User = {
    id: number;
    username: string;
    password: string;
    usertype: string;
}

export type BugReport = {
    id: number;
    user: User;
    title: string;
    description: string;
    resolved: boolean;
}