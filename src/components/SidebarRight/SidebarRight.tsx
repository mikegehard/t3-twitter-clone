import Avatar from "@components/Avatar";
import MainButton from "@components/MainButton";
import NextLink from "@components/NextLink";
import { PickVerificationIcon } from "@components/PickVerificationIcon";
import GithubIcon from "@icons/social/github";
import { trpc } from "@utils/trpc";
import React, { useEffect, useState } from "react";

export default function SidebarRight() {
  return (
    <div className="hidden h-screen w-[290px] lg:block lg:w-[350px]">
      <div className="fixed flex h-screen w-[290px] flex-col overflow-y-auto lg:w-[350px]">
        <SearchBar />
        <WhoToFollow />
        <div className="flex items-center ml-3">
          <GithubIcon className="h-6 w-6 fill-white mr-1 " /> Made by{" "}
          <a
            href="https://github.com/AlandSleman/t3-twitter-clone"
                        className="ml-1 text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            AlandSleman
          </a>
        </div>
      </div>
    </div>
  );
}
function SearchBar() {
  return (
    <div className="relative m-2">
      <div className="absolute   flex h-full cursor-pointer items-center pl-4 text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-mail"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </svg>
      </div>
      <input
        disabled
        className=" flex  h-9 w-full cursor-not-allowed items-center rounded-full bg-[#202327] p-6 pl-12 text-sm font-normal text-gray-100 "
        placeholder="Search Twitter"
      />
    </div>
  );
}

const _TrendingTopic = ({
  hashtag,
  tweets,
}: {
  hashtag: string;
  tweets: string;
}) => {
  return (
    <div
      className={`main-border sidebar-hover dark:border-dim-200 cursor-pointer p-3 text-sm font-normal text-blue-400 transition ease-in-out`}
    >
      <h2 className="text-md font-bold text-gray-800 dark:text-white">
        {hashtag}
      </h2>
      <p className="text-xs text-gray-400">{tweets} Tweets</p>
    </div>
  );
};

const TwitterAccount = ({
  name,
  username,
  profileImage,
  badge,
}: {
  name: string | null;
  username: string;
  profileImage: string | null;
  badge: string | null;
}) => {
  return (
    <NextLink href={"/" + username}>
      <div
        className={`main-border sidebar-hover dark:border-dim-200 cursor-pointer p-3 text-sm font-normal text-blue-400 transition ease-in-out`}
      >
        <div className="flex flex-row justify-between p-2">
          <div className="flex flex-row">
            <Avatar avatarImage={profileImage ?? undefined} size={48} />
            <div className="ml-2 flex flex-col">
              <h1 className="max-w-[100px] truncate  text-sm font-bold text-gray-900 dark:text-white">
                {name || username}
              </h1>
              <p className="text-sm text-gray-400">@{username}</p>
            </div>
            <PickVerificationIcon color={badge ?? undefined} />
          </div>
          <MainButton className="bg-slate-700" text="Profile" />
        </div>
      </div>
    </NextLink>
  );
};

const WhoToFollow = () => {
  const getTopUsers = trpc.user.topUsers.useQuery();
  const [topUsers, setTopUsers] = useState(getTopUsers.data?.users);
  useEffect(() => {
    setTopUsers(getTopUsers.data?.users);
  }, [getTopUsers.data]);
  return (
    <div className={`sidebar-bg m-2 rounded-2xl`}>
      <h1 className="p-3  text-lg font-bold text-gray-900 dark:text-white">
        Who to follow
      </h1>
      {topUsers?.map((u, i) => (
        <TwitterAccount key={i} {...u} />
      ))}
    </div>
  );
};
