import React, { useEffect, useState } from "react";
import { Spinner } from "@components/Spinner";
import { trpc } from "@utils/trpc";
import { PageHead } from "@components/PageHead";
import MainButton from "@components/MainButton";
import { UserMetadata } from "@components/UserMetadata/UserMetadata";
import NextLink from "@components/NextLink";
export default function FollowersContent({
    username,
    showFollowers,
}: {
    username: string;
    showFollowers: boolean;
}) {
    const userFollowers = trpc.user.getUserFollowers.useQuery({ username });
    const userFollowersData = userFollowers.data?.userFollowers;
    const [followers, setFollowers] = useState(
        userFollowersData?.[
        showFollowers ? "followers" : "following"
        ]
    );
    useEffect(() => {
        setFollowers(
            userFollowersData?.[
            showFollowers ? "followers" : "following"
            ]
        );
    }, [userFollowers.data, userFollowersData, showFollowers]);
    return (
        <div className="main-border h-screen border-b border-l border-r sm:w-[600px]">
            <PageHead backBtn name={showFollowers ? "Followers" : "Following"} />

            {userFollowers.data || userFollowers.isLoading ? (
                <>
                    <div className="flex flex-col space-y-4 p-2">
                        {followers?.map((f) => (
                            <div key={f.id} className=" flex flex-col -space-y-2.5">
                                            {/* @ts-expect-error dynamic property access based on showFollowers */}
                                <NextLink href={`/${f[showFollowers ? "following" : "follower"].username}`}>
                                    <div className=" flex ">
                                        <UserMetadata
                                            // @ts-expect-error dynamic property access based on showFollowers
                                            user={{ ...f[showFollowers ? "following" : "follower"] }}
                                        />
                                        <MainButton className="ml-auto h-8 w-24" text="Profile" />
                                    </div>
                                </NextLink>
                                <p className="text-tweet ml-[65px] break-words">
                                    {/* @ts-expect-error dynamic property access based on showFollowers */}
                                    {f[showFollowers ? "following" : "follower"].bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
}
