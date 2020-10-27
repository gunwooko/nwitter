import React from "react";
import { useHistory, useHistoy } from "react-router-dom";
import { authService } from "fbase";

const Profile = () => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
