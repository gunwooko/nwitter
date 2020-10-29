import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // make random unique id
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); // First we create a reference to the file
      const response = await attachmentRef.putString(attachment, "data_url"); // and then we update data to that reference
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorID: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    console.log(files[0]);
    const theFile = files[0]; // out input only access a one file, that's why we select first file [0]
    const reader = new FileReader(); // create a reader => check it on MDN
    reader.onloadend = (finishedEvent) => {
      // when it have finished reading "theFile", we can get "finishedEvent" => eventListener
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (theFile) {
      // if theFile is not undefined
      reader.readAsDataURL(theFile); // start to read "theFile" asynchronously
    }
    setAttachment("");
  };

  const onClearAttachment = () => {
    setAttachment("");
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && ( // when attachment is true, ...
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
