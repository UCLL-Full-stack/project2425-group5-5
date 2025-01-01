import { User } from "./user";
import { BugReport as BugReportPrisma, User as UserPrisma} from "@prisma/client"

export class BugReport{
    private id?: number;
    private user: User;
    private title: string;
    private description: string;
    private resolved: boolean;

    constructor( bugReport: {
        id?: number;
        user: User;
        title: string;
        description: string;
        resolved: boolean;
    }){
        this.validate(bugReport)
        this.id = bugReport.id;
        this.user = bugReport.user;
        this.title = bugReport.title;
        this.description = bugReport.description;
        this.resolved = false;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getTitle(): string {
        return this.title
    }

    getDescription(): string {
        return this.description
    }

    getResolved(): boolean {
        return this.resolved
    }

    validate( bugReport: {
        id?: number;
        user: User;
        title: string;
        description: string;
        resolved: boolean;
    }){
        if(!bugReport.title.trim()) {
            throw new Error('Title is required')
        }

        if(!bugReport.user){
            throw new Error('User is required')
        }

        if(!bugReport.description.trim()) {
            throw new Error('Description is required')
        }
    }
    equals(bugReport: BugReport): Boolean {
        return(
            this.title === bugReport.getTitle() &&
            this.user === bugReport.getUser() &&
            this.description === bugReport.getDescription() &&
            this.resolved === bugReport.getResolved()
        )
    }

    static from({id, user, title, description, resolved}: BugReportPrisma & {user: UserPrisma}){
        return new BugReport({
            id,
            title,
            user: User.from(user),
            description,
            resolved
        })
    }
}