import React, { useEffect, useState } from "react";
import { TweetInput } from "@components/inputs/TweetInput";
import { trpc } from "@utils/trpc";
import { Spinner } from "@components/Spinner";
import { PageHead } from "@components/PageHead";
import MainTweet from "@components/MainTweet";
import { useInView } from "react-intersection-observer";
import { TweetProps } from "@types";

export default function HomeContent() {
  const getTweets = trpc.tweet.getAllTweets.useMutation();
  const [tweets, setTweets] = useState(getTweets.data?.tweets);
  const [hasMore, setHasMore] = useState(false);

  const { ref, inView, entry: _entry } = useInView({
    threshold: 0,
  });
  async function fetchTweets() {
    const skip = tweets?.length || 0;
    const newTweets = await getTweets.mutateAsync({ skip });
    const uniqueTweets = removeDuplicates([
      ...(tweets || []),
      ...(newTweets?.tweets || []),
    ]);
    setTweets(uniqueTweets);
    setHasMore(newTweets.hasMore);
  }

  function removeDuplicates(tweets: TweetProps[]) {
    const tweetSet = new Set();
    return tweets.filter((tweet: TweetProps) => {
      if (tweetSet.has(tweet.id)) {
        return false;
      } else {
        tweetSet.add(tweet.id);
        return true;
      }
    });
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  // Refetch tweets when inView and not loading
  useEffect(() => {
    if (inView && !getTweets.isLoading && hasMore) {
      fetchTweets();
    }
  }, [getTweets.isLoading, inView, tweets, hasMore]);

  function onPost(data: unknown) {
    if (data) {
      setTweets([data as TweetProps, ...(tweets || [])]);
    }
  }
  return (
    <div className="main-content ">
      <div className="main-border mcz border-b border-l border-r ">
        <PageHead name="Home" />
        <TweetInput onPost={onPost} />

        {/* 
         <NewTweets /> */}
        {tweets?.map((t, i) => (
          <MainTweet key={i} tweet={t} />
        ))}
        <div ref={ref}>
          {hasMore && <Spinner />}
          {getTweets.isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
}
