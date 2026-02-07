import { UserData } from "@types";
import { useSession } from "next-auth/react";

export function getUserSession(): UserData {
    const { data } = useSession();
    return data?.userData as UserData;
}
