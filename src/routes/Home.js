import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get(); // This give me a querySnapShot which contains a lot of things => check oficial doc
    dbNweets.forEach((document) => {
      const nweetsObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetsObject, ...prev]); // Here I use implicit return and a function inside of setNweets where React provides previous value.
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("nweets")
      .add({ nweet: nweet, createdAt: Date.now() });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  console.log(nweets);
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
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
