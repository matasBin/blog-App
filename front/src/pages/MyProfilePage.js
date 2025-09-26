import ProfileImage from "../components/ProfileImage";
import ProfileInfo from "../components/ProfileInfo";
import ProfilePokesInfo from "../components/ProfilePokesInfo";

const MyProfilePage = () => {

    return (
        <div className={"MyProfilePage"}>


                <div className="profileContainer">
                    <div className="profile">
                        <ProfileImage/>
                        <ProfileInfo/>
                    </div>
                    <div className="background">
                        {/*some background image here*/}
                    </div>
                </div>
                <div className="pokesSection">
                    <ProfilePokesInfo/>
                </div>

        </div>
    );
};

export default MyProfilePage;