import { BugReport } from "../model/bugReport";
import { User } from "../model/user";

const bugReports = [
    new BugReport({
        id:1,
        user: new User({
            id: 1,
            username: "Blahooga",
            password: "blah123",
            usertype: "user"
        }),
        title: "Clipping textures at misthaven cave entrance",
        description: "When arriving at misthaven cave, the door clips with the wall",
        resolved: false
    })
]

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
    getBugReportById,
    getAllBugReports
}