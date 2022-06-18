import './closeFriend.css';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

export default function CloseFriend({ user }) {
  return (
    <div className="sidebarFriend">
      <Link to={`/profile/${user.username}`}>
        <LazyLoad>
          <img
            className="sidebarFriendImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : 'https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png'
            }
            alt=""
          />
        </LazyLoad>
      </Link>
      <span className="sidebarFriendName">{user.username}</span>
    </div>
  );
}
