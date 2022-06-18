import './post.css';
import axios from 'axios';
import { MoreVert } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LazyLoad from 'react-lazyload';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <LazyLoad>
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : 'https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png'
                  }
                  alt=""
                />
              </LazyLoad>
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <LazyLoad>
            <img className="postImg" src={post.img} alt="" />
          </LazyLoad>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <LazyLoad>
              <img
                className="likeIcon"
                src="https://res.cloudinary.com/social-media-appwe/image/upload/v1633782263/social/assets/like_kw61xh.png"
                onClick={likeHandler}
                alt=""
              />
            </LazyLoad>

            <span className="postLikeCounter">{like} people like it</span>
          </div>
        </div>
      </div>
    </div>
  );
}
