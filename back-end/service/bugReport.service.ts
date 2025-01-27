import { BugReport } from "../model/bugReport";
import { User } from "../model/user";
import bugReportDb from "../repository/bugReport.db";
import userDb from "../repository/user.db";
import { BugReportInput } from "../types";
import userService from "./user.service";

const createBugReport =  async ({
    title,
    description,
    resolved,
    user: User,
}: BugReportInput): Promise<BugReport> => {
    const user = await userService.getUserByName(User.username!);

    if (!user || user.getId == null) throw new Error('no user found');
    if (!title || !description) throw new Error('Title and/or description are required');

    if (!user) throw new Error('User not found');

    const bugReport = new BugReport({title, description, resolved, user});
    return bugReportDb.createBugReport(bugReport, user);
};

const getAllBugReports = async (): Promise<BugReport[]> => bugReportDb.getAllBugReports();

const getBugReportById = async(id: number): Promise<BugReport | null> =>  {
    const bugReport = bugReportDb.getBugReportById({id})
    if (!bugReport) throw new Error(`bug report with id ${id} does not exist.`)
    return bugReport
}

export default {
    getAllBugReports,
    getBugReportById,
    createBugReport,

}