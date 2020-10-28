import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // // Old way
  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get(); // This give me a querySnapShot which contains a lot of things => check oficial doc
  //   dbNweets.forEach((document) => {
  //     const nweetsObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetsObject, ...prev]); // Here I use implicit return and a function inside of setNweets where React provides previous value.
  //   });
  // };

  useEffect(() => {
    // getNweets();
    // New way => It doesn't re-render! => more fast! => REAL TIME!!! <It is so usefull when you make a chat app>
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id, // It's useful to identify => Help to delete or update nweet
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("nweets")
      .add({ text: nweet, createdAt: Date.now(), creatorID: userObj.uid });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="type"
          placeholder="What's on your mine?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorID === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
