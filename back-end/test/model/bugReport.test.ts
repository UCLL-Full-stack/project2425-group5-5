import { set } from 'date-fns';
import { User } from '../../model/user';
import { BugReport } from '../../model/bugReport';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });

const user = new User({
    id: 0,
    username: "kiriko",
    password: "kirikoreki123",
    usertype: "user"
})

const bugReport = new BugReport({
    id:0,
    user: user,
    title: "testbugreport",
    description: "this is a test",
    resolved: false
})

test('given: a valid bug report, when: bugreport is created, then: bugreport is created with valid values', () => {
    //given
    const validId = 2000
    const validuser = user
    const validtitle = "test"
    const validdescription = "testdesc"
    const validresolved = false

    //when
    const testbugreport = new BugReport({
        id: validId,
        user: validuser,
        title: validtitle,
        description: validdescription,
        resolved: validresolved
    })

    //then
    expect(testbugreport.getId()).toEqual(validId)
    expect(testbugreport.getUser()).toEqual(validuser)
    expect(testbugreport.getTitle()).toEqual(validtitle)
    expect(testbugreport.getDescription()).toEqual(validdescription)
    expect(testbugreport.getResolved()).toEqual(validresolved)
})

test('given: an invalid bugreport, when: bugreport is created, then: bugreport throws error', () => {
    //given
    const validId = 2000
    const validuser = user
    const invalidtitle = ""
    const validdescription = "testdesc"
    const validresolved = false

    //when
    const testbugreport = () => new BugReport({
        id: validId,
        user: validuser,
        title: invalidtitle,
        description: validdescription,
        resolved: validresolved
    })

    //then
    expect(testbugreport).toThrow('Title is required')
})

test('given: an invalid bugreport, when: bugreport is created, then: bugreport throws error', () => {
    //given
    const validId = 2000
    const validuser = user
    const validtitle = "test"
    const invaliddescription = ""
    const validresolved = false

    //when
    const testbugreport = () => new BugReport({
        id: validId,
        user: validuser,
        title: validtitle,
        description: invaliddescription,
        resolved: validresolved
    })

    //then
    expect(testbugreport).toThrow('Description is required')
})

test('given: an invalid bugreport, when: bugreport is created, then: bugreport throws error', () => {
    //given
    const validuser = user
    const validtitle = "test"
    const validdescription = "testdesc"
    const validresolved = false

    //when
    const testbugreport = new BugReport({
        user: validuser,
        title: validtitle,
        description: validdescription,
        resolved: validresolved
    })

    //then
    expect(testbugreport.getId()).toBeUndefined()
})