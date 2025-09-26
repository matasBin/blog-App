import {Link} from "react-router-dom";

const UserCard = ({item, index}) => {

    return (
        <div className={ "UserCard"} style={{animationDelay: `${index * 0.09}s`}}>
            <Link to={`/user/${item.username}`}>
                <img src={item.image} alt=""/>
                <h4>{item.username}</h4>
            </Link>

        </div>
    );
};

export default UserCard;