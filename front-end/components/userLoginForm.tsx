import userService from "@services/userService"
import { StatusMessage } from "@types"
import classNames from "classnames"
import { useRouter } from "next/router"
import { useState } from "react"

const UserLoginForm: React.FC = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [nameError, setNameError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [statusmessages, setStatusmessages] = useState<StatusMessage[]>([])
    const router = useRouter()

    const clearErrors = () => {
        setNameError(null)
        setPasswordError(null)
        setStatusmessages([])
    }

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === ""){
            setNameError("Please fill in name")
            result = false
        }

        if(!password && password.trim() === ""){
            setPasswordError("please fill in password")
            result = false
        }

        return result
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        clearErrors()
        if(!validate()){
            return
        }

        const user = { username: name, password: password };
        const response = await userService.loginUser(user);

        if (response.status === 200) {
            setStatusmessages([
                {
                    message: `Login succesful. Redirecting to homepage...`,
                    type: "success",
                },
            ]);

            const user = await response.json();
            localStorage.setItem("loggedInUser", JSON.stringify({
                token: user.token,
                username: user.username,
                usertype: user.usertype,
            }));

            setTimeout(() => {
                router.push("/");
            }, 2000);
        }
    }




    return (
        <>

            <h3 className="px-0">Login</h3>
            {statusmessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
                        {statusmessages.map(({message, type}, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success"
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    username
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {nameError && <div className="text-red-800 ">{nameError}</div>}
                </div>
                <div className="mt-2">
                    <div>
                        <label
                            htmlFor="passwordInput"
                            className="block mb-2 text-sm font-medium"
                        >
                            password
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                        />
                        {passwordError && (
                            <div className=" text-red-800">{passwordError}</div>
                        )}
                    </div>
                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    login
                </button>
            </form>


        </>
    )
}

export default UserLoginForm