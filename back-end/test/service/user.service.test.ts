import { set } from "date-fns";
import { BugReportInput, UserInput } from "../../types";
import { BugReport } from "../../model/bugReport";
import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";
import bcrypt, { hash } from 'bcrypt'
const userInput:UserInput = ({
    username: "testuser",
    password: "testuserpassword",
    usertype: "user"
})

const user = new User({
    ...userInput
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
    expect(createUserMock).toHaveBeenCalledWith(expect.objectContaining({username: "testuser",usertype: "user"}))
})

test("given a duplicate user, when a user is being created, the error is thrown", async () => {
    //given
    userDb.getUserByName = mockGetUserByName.mockResolvedValue(user)
    //when
    const createUser = async() => 
        await userService.createUser({
            ...userInput
        })

    //then
    await expect(createUser).rejects.toThrow('User with name already exists')
})