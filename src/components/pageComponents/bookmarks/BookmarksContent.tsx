import React, { useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import { Spinner } from "@components/Spinner";
import { PageHead } from "@components/PageHead";
import MainTweet from "@components/MainTweet";

export default function BookmarksContent() {
  const allTweets = trpc.tweet.getAllTweets.useMutation();
  const [tweets, setTweets] = useState(allTweets.data?.tweets);
  console.log("tweetssss", tweets, allTweets.data);
  useEffect(() => {
    setTweets(allTweets.data?.tweets);
  }, [allTweets.data]);

  return (
    <div className="main-content ">
      <div className="main-border mcz border-b border-l border-r ">
        <PageHead name="Bookmarks" />
        {tweets?.map((t) => (
          <MainTweet key={t.id} tweet={t} />
        ))}
        <Spinner />
      </div>
    </div>
  );
}
