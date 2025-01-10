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
    ...userInput
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

let createUserMock: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetUserByName: jest.Mock;
beforeEach(() => {
    mockGetUserById = jest.fn()
    createUserMock = jest.fn()
    mockGetUserByName = jest.fn()

})

afterEach(() => {
    jest.clearAllMocks()
})






test("given a valid user, when a user is being created, the user will be created with said values", async () => {
    //given
    userDb.getUserById = mockGetUserById.mockResolvedValue(user)
    userDb.createUser = createUserMock;
    //when
    await userService.createUser({
        ...userInput
    })

    //then
    expect(createUserMock).toHaveBeenCalledTimes(1)
    expect(createUserMock).toHaveBeenCalledWith(
        new User({...userInput})
    )
})

test("given a duplicate user, when a user is being created, the error is thrown", async () => {
    //given
    userDb.getUserByName = mockGetUserByName.mockResolvedValue([user])
    userDb.createUser = createUserMock;
    //when
    const createUser = async () => 
        await userService.createUser({
            ...userInput
        })

    //then
    expect(createUser).rejects.toThrow('User with name already exists')
})