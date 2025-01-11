import { set } from "date-fns";
import { BugReportInput, UserInput } from "../../types";
import { BugReport } from "../../model/bugReport";
import { User } from "../../model/user";
import bugReportDb from "../../repository/bugReport.db";
import userDb from "../../repository/user.db";
import bugReportService from "../../service/bugReport.service";
import userService from "../../service/user.service";

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });

const userInput:UserInput = ({
    id: 1,
    username: "testuser",
    password: "testuserpassword",
    usertype: "user"
})

const user = new User({
    id: 1,
    username: "testuser",
    password: "testuserpassword",
    usertype: "user"
})

const bugReportInput:BugReportInput = ({
    id: 1,
    user: userInput,
    title: "testbug",
    description: "testbugdescription",
    resolved: false
})

const bugReport = new BugReport({
    id: 1,
    user,
    title: "testbug",
    description: "testbugdescription",
    resolved: false
})

let createBugReportMock: jest.Mock;

let mockGetBugReportById: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetUserByName: jest.Mock;


beforeEach(() => {
    mockGetBugReportById = jest.fn()
    mockGetUserById = jest.fn()
    createBugReportMock = jest.fn()
    mockGetUserByName = jest.fn()

})

afterEach(() => {
    jest.clearAllMocks()
})






test("given a valid user and input for bugreport, when a bugreport is being created, the bugreport will be created with said values", async () => {
    //given
    const user = new User({
        id: 1,
        username: "testuser",
        password: "testuserpassword",
        usertype: "user",
    });
    userService.getUserByName = mockGetUserByName.mockResolvedValue(user)
    userService.getUserById = mockGetUserById.mockResolvedValue(user)

    bugReportDb.createBugReport = createBugReportMock;
    //when
    

    await bugReportService.createBugReport({
        user: userInput,
        title: "testbug",
        description: "testbugdescription",
        resolved: false
    })

    //then
    expect(createBugReportMock).toHaveBeenCalledTimes(1)
    expect(createBugReportMock).toHaveBeenCalledWith(
        new BugReport({
            user: user,
            title: "testbug",
            description: "testbugdescription",
            resolved: false
        }),
        new User({ 
            id: 1,
            username: "testuser",
            password: "testuserpassword",
            usertype: "user",
        }) //WHYYYY? HOW????? WHY DOES IT NEED THIS????
    )
})