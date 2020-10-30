import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // useEffect(() => {
  //   const helpFunction = async () => {
  //     // reference => https://www.robinwieruch.de/react-hooks-fetch-data
  //     const nweets = await dbService
  //       .collection("nweets")
  //       .where("creatorID", "==", userObj.uid)
  //       .orderBy("createdAt", "desc") // noSQL => FirebaseError: The query requires an index. => firebase shows us an error how to fix it
  //       .get();
  //     console.log(nweets.docs.map((doc) => doc.data()));
  //   };
  //   helpFunction();
  // });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
