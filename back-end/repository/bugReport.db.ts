import { BugReport } from "../model/bugReport";
import { User } from "../model/user";
import database from "./database";

const createBugReport = async (bugReport : BugReport): Promise<BugReport> => {
    try{
        const bugReportPrisma = await database.bugReport.create({
            data: {
                title: bugReport.getTitle(),
                description: bugReport.getTitle(),
                resolved: bugReport.getResolved(),
                user: {
                    connect: {
                        id: 1,
                    }
                }
            }, include: {
                user: true
            }
        })
        return BugReport.from(bugReportPrisma)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const getBugReportById = async ({id} : {id: number}) : Promise<BugReport | null> => {
    try {
        const bugReportPrisma = await database.bugReport.findUnique({
            where : { id }, 
            include: {
                user: true
            }
        })
        return bugReportPrisma ? BugReport.from(bugReportPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllBugReports = async () : Promise<BugReport[]> => {
    try {
        const bugReportPrisma = await database.bugReport.findMany({
             
            include: {
                user: true
            }
        })
        return bugReportPrisma.map((bugReportPrisma) => BugReport.from(bugReportPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{
    createBugReport,
    getBugReportById,
    getAllBugReports,

}