import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  useEffect(async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorID", "==", userObj.uid)
      .orderBy("createdAt", "desc") // noSQL => FirebaseError: The query requires an index. => firebase shows us an error how to fix it
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  });

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
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
