import {currentUser} from "../store/allStatesStore"
import {useEffect} from "react";


const useLoggedInUser = () => {
    const loggedInUser = currentUser((state) => state.currentUser)
    const setLoggedInUser = currentUser((state) => state.setCurrentUser);

    useEffect(() => {
        async function getLoggedInUser() {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }
            const res = await fetch("http://localhost:2500/api/loggedInUser", options)
            const data = await res.json()
            console.log(data)
            if (data.success) {
                setLoggedInUser(data.user)
            }
        }
        getLoggedInUser()
    }, [])
    return loggedInUser
}

export default useLoggedInUser;

