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
  userId,
  fetchuserprofiles,
}) => {
  const { user } = useContext(AuthContext);
  const [friendReqRes, setfriendReqRes] = useState({});
  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //     fetchUsers()
  // }, [])

  // console.log(RequestedUser, 'RequestedUser');
  const [isAdmin, setIsAdmin] = useState(true);
  const handleAddFriend = (e) => {
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
      })
      .catch((err) => {
        console.log(err);
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
      })
      .catch((err) => {
        console.log(err);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveFriendRequest = (e) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/removeFriendRequest/${proid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ userId: e }),
      }
    )
      .then(fetchuserprofiles)
      .catch(console.log);
  };
  const sendNotification = (userId, type) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/notification/addnotifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          profileId: profiledata._id,
          loggedInId: userId,
          notificationType: type,
        }),
      }
    );
  };

  const handleAddFriends = (e, type) => {
    sendNotification(
      e,
      type === 'profileAdmin' ? 'profileAdmin' : 'profileFriend'
    );
    handleRemoveFriendRequest(e);
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/addFriends/${proid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ userId: e, isFriend: true }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAdminres(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddAdmins = (e) => {
    handleAddFriends(e, 'profileAdmin');
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/addAdmins/${proid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ isAdmin: true, userId: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setAdminres(res);
      })
      .catch((err) => {
        console.log(err);
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

  const handleDeleteAdmins = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/removeAdmin/${proid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(fetchuserprofiles)
      .catch(console.log);
  };
  const handleDeleteFriend = (userId) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/removeFriend/${proid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ userId }),
      }
    )
      .then(fetchuserprofiles)
      .catch(console.log);
  };
  return (
    <div className="friends-list">
      <div>
        <h1>חברים</h1>
        {profiledata && profiledata.addFriends.length > 0 ? (
          profiledata.addFriends.map((friend, i) => {
            return (
              <div className="friend-request" key={i}>
                <div className="friend-request-details">
                  <img
                    src={
                      friend.user[0].mainProfilePicture
                        ? `${process.env.REACT_APP_API_URL}/picUploader/${friend.user[0].mainProfilePicture}`
                        : friend.user[0].profilePicture
                    }
                    alt="profile"
                  />
                  <p>
                    {friend.user && friend.user[0] && friend.user[0].firstName}
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
                    onClick={() => handleDeleteFriend(friend.user[0]._id)}
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
        <div
        // className={`${
        //   profiledata.originalUser[0]._id === user._id ||
        //   (profiledata.addAdmins.length &&
        //     profiledata.addAdmins.indexOf(user.id)) ?
        //     '' :
        //     'hidden' 
        // }`}
        >
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
                          : friend.user[0].profilePicture
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
                      onClick={() => handleAddFriends(friend.user[0]._id)}
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
                      onClick={() => handleAddAdmins(friend.user[0]._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      הוסף כאדמין
                    </span>
                    <span
                      onClick={() =>
                        handleRemoveFriendRequest(friend.user[0]._id)
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      Decline
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center' }}>אין הצעות עדיין</div>
          )}
        </div>
        <div
        className={`${
          profiledata.originalUser[0]._id === user._id ?
          // (profiledata.addAdmins.length &&
          //   profiledata.addAdmins.indexOf(user.id)) ?
            '' :
            'hidden' 
        }`}
        >
          <h1>אדמינים</h1>
          {profiledata && profiledata.addAdmins.length > 0 ? (
            profiledata.addAdmins.map((admin, i) => {
              return (
                <div
                  className="friend-request"
                  key={admin.user && admin.user[0]._id}
                >
                  <div className="friend-request-details">
                    <img
                      src={
                        admin.user[0].mainProfilePicture
                          ? `${process.env.REACT_APP_API_URL}/picUploader/${admin.user[0].mainProfilePicture}`
                          : admin.user[0].profilePicture
                      }
                      alt="profile"
                    />
                    <p>{admin.user && admin.user[0].firstName}</p>
                  </div>
                  <div>
                    <span
                      onClick={() => handleDeleteAdmins(admin.user[0]._id)}
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
      </div>
      {/* ) : (
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
      )} */}
    </div>
  );
};
export default FriendsList;