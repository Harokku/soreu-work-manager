import {createRoot, createSignal} from "solid-js";

function createUserStore() {

    // --------------------
    // --- Solid Store ---

    // Create signal
    const [user, setUser] = createSignal(null)
    const [loggedIn, setLoggedIn] = createSignal(false)

    // Login user
    const login = (user) => {
        sessionStorage.setItem("user", user) // <-- store user in session storage
        setUser(user) // <-- set user in store
        setLoggedIn(true) // <-- set loggedIn in store
    }

    // check if user is logged in
    const checkLogin = () => {
        const user = sessionStorage.getItem("user")
        if (user) {
            setUser(user)
            setLoggedIn(true)
            return true
        }
        return false
    }


    // export data and functions
    return {
        user,
        login,
        loggedIn,
        checkLogin,
    }
}

export default createRoot(createUserStore)