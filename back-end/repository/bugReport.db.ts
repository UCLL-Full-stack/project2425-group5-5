import { BugReport } from "../model/bugReport";
import { User } from "../model/user";
const users = [
    new User({
        id: 1,
        username: "Blahooga",
        password: "blahoog123",
        usertype: "user"
    }),
    new User({
        id: 2,
        username: "kiriko",
        password: "kirikokone",
        usertype: "admin"
    })
]
const bugReports = [
    new BugReport({
        id:1,
        user: users[0],
        title: "Clipping textures at misthaven cave entrance",
        description: "When arriving at misthaven cave, the door clips with the wall",
        resolved: false
    }),
    new BugReport({
        id:2,
        user: users[1],
        title: "door broken in stag garden",
        description: "After boss battle with the stag in stag garden, the door does not open",
        resolved: false
    }),
    new BugReport({
        id:3,
        user: users[0],
        title: "Increasing frame drops during aurora events",
        description: "When lightweaver starts aurora events, frames drop significantly",
        resolved: false
    }),

]

const addBugReport = (bugReport : BugReport): BugReport => {
    bugReports.push(bugReport);
    return bugReport
}

const getBugReportById = ({id} : {id: number}) : BugReport | null => {
    try {
        return bugReports.find((bugReport) => bugReport.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllBugReports = () : BugReport[] => {
    try {
        return bugReports;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{
    addBugReport,
    getBugReportById,
    getAllBugReports,

}