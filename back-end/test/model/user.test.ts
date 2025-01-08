import { set } from 'date-fns';
import { User } from '../../model/user';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });

const user = new User({
    id: 0,
    username: "kiriko",
    password: "kirikoreki123",
    usertype: "user"
})

test('given: a valid user, when: user is created, then: user is created with valid values', () => {
    //given
    const validId: number = 1000
    const validUsername = "validusername"
    const validPassword = "8letters"
    const validUserType = "user"
    //when
    const testUser1 = new User({id: validId, username: validUsername, password: validPassword, usertype: validUserType})

    //then
    expect(testUser1.getId()).toEqual(validId)
    expect(testUser1.getUsername()).toEqual(validUsername)
    expect(testUser1.getPassword()).toEqual(validPassword)
    expect(testUser1.getUserType()).toEqual(validUserType)
})

test('given: a 7 letter password, when: user is created, then: error is thrown for password', () => {
    //given
    const validId: number = 1000
    const validUsername = "validusername"
    const invalidpassword = "7lette"
    const validUserType = "user"
    //when
    const testUser2 = () =>
        new User({id: validId, username: validUsername, password: invalidpassword, usertype: validUserType})
    //then
    expect(testUser2).toThrow('Password must be a least 8 characters')
})

test('given: an empty password, when: user is created, then: error is thrown for password', () => {
    //given
    const validId: number = 1000
    const validUsername = "validusername"
    const invalidpassword = ""
    const validUserType = "user"
    //when
    const testUser2 = () =>
        new User({id: validId, username: validUsername, password: invalidpassword, usertype: validUserType})
    //then
    expect(testUser2).toThrow('Password is required')
})

test('given: an empty username, when: user is created, then: error is thrown for password', () => {
    //given
    const validId: number = 1000
    const invalidusername = ""
    const validpassword = "longpassword"
    const validUserType = "user"
    //when
    const testUser2 = () =>
        new User({id: validId, username: invalidusername, password: validpassword, usertype: validUserType})
    //then
    expect(testUser2).toThrow('Username is required')
})