const userService = {
    getUser: () => {
        return localStorage.getItem("user");
    },

    setUser: user => {
        return localStorage.setItem("user", JSON.stringify(user));
    }
}

export default userService;