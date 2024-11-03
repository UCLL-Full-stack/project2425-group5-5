import { BugReport } from "../model/bugReport";
import { User } from "../model/user";
import bugReportDb from "../repository/bugReport.db";
import userDb from "../repository/user.db";
import { BugReportInput } from "../types";

const createBugReport = ({
    id,
    title,
    description,
    resolved,
    user: userInput,
}: BugReportInput): BugReport => {
    if (!userInput.id) throw new Error('user id is required');
    if (!title || !description) throw new Error('Title and/or description are required');
    const user = userDb.getUserById({ id: userInput.id });
    if (!user) throw new Error('User not found');

    const bugReport = new BugReport({id, title, description, resolved, user});
    return bugReportDb.addBugReport(bugReport);
};

const getAllBugReports = (): BugReport[] => bugReportDb.getAllBugReports();

const getBugReportById = (id: number): BugReport =>  {
    const bugReport = bugReportDb.getBugReportById({id})
    if (!bugReport) throw new Error(`bug report with id ${id} does not exist.`)
    return bugReport
}

export default {
    getAllBugReports,
    getBugReportById,
    createBugReport,

}