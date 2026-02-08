import NextAuth, { getServerSession, NextAuthOptions, User } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import jwt from "jsonwebtoken";
import superjson from "superjson";
import { UserData } from "@types";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../../server/src/router/root";

const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: process.env.NEXTAUTH_URL + "/api/trpc",
      headers() {
        return {
          pass: process.env.SERVER_SECRET,
        };
      },
    }),
  ],
});

declare module "next-auth" {
  interface Session {
    userData: UserData;
  }
  interface User {
    userData: UserData;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    userData: UserData;
  }
}

export function authOptions(update?: boolean): NextAuthOptions {
  return {
    callbacks: {
      async signIn(p) {
        let success = false;
        let body = {};
        if (!p.credentials) {
          const provider = p.account?.provider;
          const username = p.user.name?.replace(/\s/g, "")
          const email = p.user.email;
          body = {
            provider,
            username,
            name: username,
            email,
          };
        } else {
          body = {
            provider: "credentials",
            username: p.credentials.username,
            password: p.credentials.password,
          };
        }
        try {
          // @ts-expect-error trpc client type mismatch
          const createUser = await client.user.createUser.mutate({ ...body });
          success = createUser.success;
          const userData = createUser.data;
          if (typeof createUser.data === "string") {
            throw new Error(createUser.data);
          }
          // @ts-expect-error next-auth type override
          p.user.userData = userData;
        } catch {}
        return success;
      },

      async jwt(p) {
        if (update) {
          const { user } = await client.user.getUser.query({
            id: p.token.userData.id,
          });
          // @ts-expect-error next-auth type override
          p.token.userData = user;
        } else {
          p.token.userData = p.user?.userData || p.token.userData;
        }
        // params.token.customData = params.user?.customData || params.token.customData;
        return p.token;
      },
      async session(p) {
        if (update) {
          const { user } = await client.user.getUser.query({
            id: p.token.userData.id,
          });
          // @ts-expect-error next-auth type override
          p.session.userData = user;
        } else {
          p.session.userData = p.token.userData;
        }
        return p.session;
      },
    },
    providers: getProviders(),
    jwt: {
      async encode(p) {
        const token = jwt.sign(p.token!, p.secret);
        return token;
      },
      // @ts-expect-error jwt decode return type mismatch
      async decode(p) {
        // @ts-expect-error jwt params possibly undefined
        const decoded = jwt.verify(p.token, p.secret);
        return decoded;
      },
    },
  };
}
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions());
};
function getProviders() {
  return [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let body = {};
        if (!credentials) {
          throw new Error("Invalid login");
        } else {
          body = {
            provider: "credentials",
            username: credentials.username,
            password: credentials.password,
          };
        }
        // @ts-expect-error trpc client type mismatch
        const createUser = await client.user.createUser.mutate({ ...body });
        // @ts-expect-error next-auth user type override
        const userData: User = { userData: createUser.data };
        if (typeof createUser.data === "string") {
          throw new Error(createUser.data);
        }
        return userData;
      },
    }),
  ];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-expect-error query param type mismatch
  return await NextAuth(req, res, authOptions(req?.query?.update));
};
export default handler;
