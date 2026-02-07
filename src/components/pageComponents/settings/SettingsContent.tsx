import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { Spinner } from "@components/Spinner";
import { PageHead } from "@components/PageHead";
import MainButton from "@components/MainButton";

type SettingsInputs = {
  username: string;
};

export default function SettingsContent() {
  const {
    register,
  } = useForm<SettingsInputs>();
  const allTweets = trpc.tweet.getAllTweets.useMutation();
  const [tweets, setTweets] = useState(allTweets.data?.tweets);
  console.log("tweetssss", tweets, allTweets.data);
  useEffect(() => {
    setTweets(allTweets.data?.tweets);
  }, [allTweets.data]);

  return (
    <div className="main-content ">
      <div className="main-border h-screen border-b border-l border-r sm:w-[350px] ">
        <PageHead name="Settings" />
        <div className="flex flex-col gap-4 p-4">
          <input
            {...register("username", { required: true })}
            type="text"
            className="block w-full rounded border border-solid border-gray-300 bg-transparent p-3 text-lg font-normal text-black focus:border-blue-500   
                                    focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-blue-500"
            placeholder="New passowrd"
          />
          <MainButton className="h-12" text="Save" />
        </div>
        <Spinner />
      </div>
    </div>
  );
}
