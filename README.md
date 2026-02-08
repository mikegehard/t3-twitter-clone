## Purpose

An open-source Twitter clone for learning and experimentation. Built with the T3 Stack (Next.js, tRPC, Prisma, Tailwind CSS), NextAuth for authentication, and Postgres (Supabase) for storage. Not intended for production use.

## Requirements

* Postgres Database: Supabase recommended. Register a Supabase account > Create a new project > Create a new database.
* Supabase Storage: Your project > Create a new Bucket > Add this policy to enable image uploads:
  `CREATE POLICY "<policy name>" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = '<bucket-name>');`

## How to Run Locally

* Clone the project: `git clone https://github.com/AlandSleman/t3-twitter-clone`
* Copy `.env.example` to `.env` and fill in your values
* Install dependencies: `npm install`
* Generate Prisma client: `npx prisma generate`
* Push schema to database: `npx prisma db push`
* Build: `npm run build`
* Start: `npm start`
