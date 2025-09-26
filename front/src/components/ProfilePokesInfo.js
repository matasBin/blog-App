import React from 'react';
import {currentUser} from "../store/allStatesStore";
import {convertDate} from "../utils/convertDate";
import useLoggedInUser from "../hooks/useLoggedInUser";

const ProfilePokesInfo = () => {

    const loggedInUser = useLoggedInUser()


    return (
        <div className={"ProfilePokesInfo"}>

            <h3>Pokes</h3>
            {
                loggedInUser &&
                loggedInUser.pokes && loggedInUser.pokes.length > 0 ?
                    <div className={"pokesList"}>
                        {
                            [...loggedInUser.pokes].reverse().map((item, index) =>
                            <div key={index} className={"pokeItem"}>
                                <div className="pokeInfo">
                                    <h4>{item.username}</h4>
                                    <p>{convertDate(item.date)}</p>
                                </div>
                            </div>
                            )
                        }
                    </div>
                    :
                    <p className={"noPokes"}>No pokes yet</p>
            }


        </div>
    );
};

export default ProfilePokesInfo;