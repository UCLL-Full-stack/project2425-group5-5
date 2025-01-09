import Header from "@components/header"
import userService from "@services/userService"
import { User } from "@types"
import Head from "next/head"
import useSWR, { mutate } from "swr"
import useInterval from "use-interval"

const user: React.FC = () => {
    const getUsers = async () => {
        const response = await Promise.all([userService.getAllUsers()])
        const [userResponse] = response
        if (userResponse.ok){
            const users = await userResponse.json()
            return { users }
        }
    }

    const {data, isLoading, error} = useSWR(
        "users",
        getUsers
    )

    useInterval(() => {
        mutate("users", getUsers())
        console.log(data)
    }, 1000)


    return (
        <>
        <Head>
            <title>BugSquashr</title>
            <meta name="description" content="BugSquashr forms" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {error && <div className="text-red-800">{error}</div>}
        {isLoading && <p className="text-green-800">Loading...</p>}
        {data && (
            <div>
                {data.users.map((user: User, index: any) => (
                    <li key={index}>{user.username + " : " + user.usertype}</li>
                ))}
            </div>
        )}
        </>
    )
}

export default user