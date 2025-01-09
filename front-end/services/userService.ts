const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+ "/users", {
      method: "GET",
      headers: {"Content-Type":"application/json",}
    })
  };

const userService = {
    getAllUsers
}

export default userService