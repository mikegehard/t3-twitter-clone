import { UserData } from "@types";
import { useSession } from "next-auth/react";

export function getUserSession(): UserData {
    const { data } = useSession();
    const userData = data?.userData;
    if (!userData) {
        throw new Error("User session not available");
    }
    return userData;
}
