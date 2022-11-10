import React, { useEffect, useState } from "react";

function Profile() {
    const[user, setUser] = useState({username:''});
    

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            EventBus.dispatch("logout");
        } else {
            setUser(currentUser);
            console.log(currentUser);
        }

    }, []);

    return(
        <div>

        </div>
    )
}