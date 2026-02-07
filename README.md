# T3 Twitter Clone

## Purpose

An open-source Twitter clone built with the T3 Stack (Next.js + tRPC + Prisma + NextAuth + Tailwind CSS) backed by PostgreSQL (Supabase). Demonstrates a full-stack social media application with authentication, tweets, replies, likes, retweets, bookmarks, follows, and direct messaging.

## Requirements

* **Postgres Database:** Supabase recommended. Register a Supabase account > Create a new project > Create a new database.
* **Supabase Storage:** Your project > Create a new Bucket > Add this policy to upload images via the backend:
  `CREATE POLICY "<policy name>" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = '<bucket-name>');`

## How to Run Locally

1. Clone the project: `git clone https://github.com/AlandSleman/t3-twitter-clone`
2. Copy `.env.example` to `.env` and fill in your values
3. Install dependencies: `npm install`
4. Generate Prisma client: `npx prisma generate`
5. Push the Prisma schema to the database: `npx prisma db push`
6. Build the project: `npm run build`
7. Start the project: `npm start`
