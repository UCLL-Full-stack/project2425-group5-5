import { User } from "@types";
import { preconnect } from "next/dist/server/app-render/entry-base";

const getAllUsers = async () => {
	const token = JSON.parse(localStorage.getItem("loggedInUser")!)?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL+ "/users", {
      	method: "GET",
      	headers: {"Content-Type":"application/json",
		Authorization: `Bearer ${token}`,

		}
    })
  };

const loginUser = (user: User) => {

	return fetch (process.env.NEXT_PUBLIC_API_URL + "/users/login", {
		method: "POST",
		headers: {
			"Content-Type" : "application/json",
		},
		body: JSON.stringify(user)
	})
}

const userService = {
    getAllUsers,
	loginUser
}

export default userService