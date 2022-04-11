import React, { useState, useEffect, useContext } from 'react';
import './friendslist.css';
import Rectangle7 from '../../assets/Rectangle7.png';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import userIcon from '../../assets/userIcon.png';

const FriendsList = ({
  proid,
  profiledata,
  users,
  friendRequests,
  setrfriendReq,
  setAdminres,
  fetchUsers,
}) => {
  const { user } = useContext(AuthContext);
  const [userid, setuserid] = useState('');
  const [friendReqRes, setfriendReqRes] = useState({});
  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //     fetchUsers()
  // }, [])

  // console.log(RequestedUser, 'RequestedUser');
  const [isAdmin, setIsAdmin] = useState(true);
  const handleAddFriend = (e) => {
    setuserid(e);
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/addFriends/${proid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ isFriend: false, userId: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setrfriendReq(res);
        setfriendReqRes(res);
      });
  };
  const handleAddAcceptFrined = (e) => {
    // setuserid(e)

    fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/addAcceptFriends/${proid}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          isFriend: true,
          userId: e._id,
          user: e.user[0]._id,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setrfriendReq(res);
      });
  };

  const handleAddAcceptFrined2 = (e) => {
    // setuserid(e)
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/addFriends/${proid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        isFriend: true,
        userId: e._id,
        user: e.user[0]._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setrfriendReq(res);
      });
  };

  const handleAddAdmins = (e) => {
    setuserid(e);
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/addAdmins/${proid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ isAdmin: true, userId: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAdminres(res);
      });
  };

  const handleAddFriends = (e) => {
    setuserid(e);
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/addFriends/${proid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ isFriend: true, userId: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAdminres(res);
      });
  };

  let valchek =
    profiledata &&
    profiledata.addFriends.length > 0 &&
    profiledata.addFriends.map((item, i) => {
      return item.user.map((itemA) => {
        return itemA._id;
      });
    });
  let valcheckFinal =
    valchek &&
    valchek.length > 0 &&
    valchek.map((item, i) => {
      return {
        id: item[0],
      };
    });
  let valfinalcheckid =
    valcheckFinal &&
    valcheckFinal.map((item) => {
      return item.id;
    });

  let e = users.map(
    (n, i) => valfinalcheckid && valfinalcheckid.includes(n._id)
  );

  /// for friend request
  let valchekRequest =
    profiledata &&
    profiledata.addFriends.length > 0 &&
    profiledata.addFriends.map((item, i) => {
      return item.user.map((itemA) => {
        return itemA._id;
      });
    });
  let valcheckFinalRequest =
    valchekRequest &&
    valchekRequest.length > 0 &&
    valchekRequest.map((item, i) => {
      return {
        id: item[0],
      };
    });
  let valfinalcheckidRequest =
    valcheckFinalRequest &&
    valcheckFinalRequest.map((item) => {
      return item.id;
    });

  let eRequest = users.map(
    (n, i) => valfinalcheckidRequest && valfinalcheckidRequest.includes(n._id)
  );

  ///// for admins
  let valchekAdmin =
    profiledata &&
    profiledata.addAdmins.length > 0 &&
    profiledata.addAdmins.map((item, i) => {
      return item.user.map((itemA) => {
        return itemA._id;
      });
    });
  let valcheckFinaladmin =
    valchekAdmin &&
    valchekAdmin.length > 0 &&
    valchekAdmin.map((item, i) => {
      return {
        id: item[0],
      };
    });
  let valfinalcheckidadmin =
    valcheckFinaladmin &&
    valcheckFinaladmin.map((item) => {
      return item.id;
    });

  let eAdmin = users.map(
    (n, i) => valfinalcheckidadmin && valfinalcheckidadmin.includes(n._id)
  );

  return (
    <div className="friends-list">
      {isAdmin ? (
        <div>
          <h1>חברים</h1>
          {profiledata && profiledata.addFriends.length > 0 ? (
            profiledata.addFriends.map((friend, i) => {
              return (
                <div
                  className="friend-request"
                  key={friend.user && friend.user[0] && friend.user[0]._id}
                >
                  <div className="friend-request-details">
                    <img src={friend.mainProfilePicture} alt="profile" />
                    <p>
                      {friend.user &&
                        friend.user[0] &&
                        friend.user[0].firstName}
                    </p>
                  </div>
                  <div>
                    {/* <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleAddAcceptFrined(friend)}
                    >
                      הוסף חבר
                    </span>
                    | */}
                    <span
                      style={{ cursor: 'pointer' }}
                      // onClick={() =>
                      //   handleAddAcceptFrined2(friend)
                      // }
                    >
                      הסר
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center' }}>אין חברים עדיין</div>
          )}
          <h1>בקשות חברות</h1>
          {/* {users &&
            users.length > 0 &&
            users.map((user, i) => {
              // console.log(e[i] == true, 'valchek[user._id]')
              return (
                <div className="friend-request" key={user._id}>
                  <div className="friend-request-details">
                    <img src={Rectangle7} alt="profile" />
                    <p>{user.firstName}</p>
                  </div>
                  <div>
                    {e[i] ? (
                      <span style={{ cursor: 'pointer' }}>
                        Friend reqest sent
                      </span>
                    ) : (
                      <span
                        onClick={() => handleAddFriend(user._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Friend
                      </span>
                    )}
                    |
                    {eAdmin[i] ? (
                      <span style={{ cursor: 'pointer' }}>Admin</span>
                    ) : (
                      <span
                        onClick={() => handleAddAdmins(user._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        + Add as admin
                      </span>
                    )}
                  </div>
                </div>
              );
            })} */}
          {profiledata && profiledata.friendRequests.length > 0 ? (
            profiledata.friendRequests.map((friend, i) => {
              return (
                <div
                  className="friend-request"
                  key={friend.user && friend.user[0] && friend.user[0]._id}
                >
                  <div className="friend-request-details">
                    <img
                      src={
                        friend.user[0].mainProfilePicture
                          ? `${process.env.REACT_APP_API_URL}/picUploader/${friend.user[0].mainProfilePicture}`
                          : userIcon
                      }
                      alt="profile"
                    />
                    <p>
                      {friend.user &&
                        friend.user[0] &&
                        friend.user[0].firstName}
                    </p>
                  </div>
                  <div>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleAddFriends(user._id)}
                    >
                      הוסף כחבר
                    </span>
                    |
                    {/* <span
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handleAddAcceptFrined2(friend.user[0] && friend.user[0]._id)
                      }
                    >
           decline           סרב
                    </span> */}
                    <span
                      onClick={() => handleAddAdmins(user._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      הוסף כאדמין{' '}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center' }}>אין הצעות עדיין</div>
          )}
          <h1>אדמינים</h1>
          {profiledata && profiledata.addAdmins.length > 0 ? (
            profiledata.addAdmins.map((admin, i) => {
              return (
                <div
                  className="friend-request"
                  key={admin.user && admin.user[0]._id}
                >
                  <div className="friend-request-details">
                    <img src={admin.profileImg} alt="profile" />
                    <p>{admin.user && admin.user[0].firstName}</p>
                  </div>
                  <div>
                    <span
                      onClick={() => handleAddAdmins(admin.user[0]._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      הסר
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center' }}>אין אדמינים</div>
          )}
        </div>
      ) : (
        <div>
          <h1>חברים</h1>
          {users &&
            users.length > 0 &&
            users.map((user, i) => {
              // console.log(e[i] == true, 'valchek[user._id]')
              return (
                <div className="friend-request" key={user._id}>
                  <div className="friend-request-details">
                    <img src={Rectangle7} alt="profile" />
                    <p>{user.firstName}</p>
                  </div>
                  <div>
                    {e[i] ? (
                      <span style={{ cursor: 'pointer' }}>
                        Friend reqest sent
                      </span>
                    ) : (
                      <span
                        onClick={() => handleAddFriend(user._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Friend
                      </span>
                    )}
                    |
                    {eAdmin[i] ? (
                      <span style={{ cursor: 'pointer' }}>Admin</span>
                    ) : (
                      <span
                        onClick={() => handleAddAdmins(user._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        + Add as admin
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default FriendsList;
