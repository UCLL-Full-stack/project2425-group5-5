import { set } from "date-fns";
import { BugReportInput, UserInput } from "../../types";
import { BugReport } from "../../model/bugReport";
import { User } from "../../model/user";

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });

const user = new User({
    id: 1,
    username: "testuser",
    password: "testuserpassword",
    usertype: "user"
})

const testBugReport = new BugReport({
    id: 1,
    user: user,
    title: "testbug",
    description: "testbugdescription",
    resolved: false
})

