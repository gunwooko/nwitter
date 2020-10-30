import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // Response from Firebase is late, so in this hook We can check if it is logged in or not
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        // To make responsed object small, we can choose only that we need to use
        // setUserObj(user); // => Bring us whole object of user data

        // Option 1:
        setUserObj({
          // Here we can select data which we need
          displayName: user.displayName,
          uid: user.uid,
          // Here we have to define a function which we have used in Profile.js to update our newDisplayName,
          updateProfile: (args) => user.updateProfile(args),
        });

        // // Option 2:
        // setUserObj(user); // => We take all user object and (see refreshUser function)
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // This function is useful when displayName is changed in Profile.js

    // console.log(authService.currentUser);
    // There is a problem that React can not catch the change of profile's display name because authService.currentUser returns a masive object (It's hard to know)
    // There are two ways to resolve this problem:
    // Option 1. Make this object small => choose what we want to use
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });

    // // Option 2. Let React notice a change
    // setUserObj(Object.assign({}, user)); // but when I use this option, there is an error => TypeError: userObj.updateProfile is not a function
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
      <footer> &copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
