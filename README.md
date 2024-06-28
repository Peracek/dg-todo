# TODO list app

Welcome! This a simple TODO list app created as a test tasks to show my coding skills.

Technologies used: TypeScript, Next.js, Tailwind, Prisma + PostgreSQL, pnpm.

> [!NOTE] The only authentication method is using GitHub OAuth.

## Requirements

### Design

- Esthetically pleasing and easy-to-use UI
- Desktop-first design

### Task list

- Show list of tasks per authenticated user
- Task has a name and description
- Form for creating and editing tasks

### Persistence

- Store tasks in database

### Error handling

- Make sure user is informed about possible errors

## Extra: Offline mode

To make the task a bit more challenging and educating I've implemented an offline mode allowing user to work with tasks when out of network connection. When the user gets back online the pending changes are synched with database.

Here's a demo how it looks like.

https://github.com/Peracek/dg-todo/assets/9009298/cf4769d4-7f18-41c9-8c4c-27207033b20f

## How to run

First you need to create your .env file. Create a copy of `.env.development.example` and name it `.env.development.local`. Fill your own variables.

Run the development server.

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Read more about Next.js development in [Next.js Documentation](https://nextjs.org/docs).

## How to work with databse

Edit `prisma.schema` following the [Prisma docs](https://www.prisma.io/docs).

```bash
# push schema changes to database
pnpm prisma:push

# regenerate client
pnpm prisma:client
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Missing features

- no email authentication: can be done using [Auth.js Prisma adapter](https://authjs.dev/reference/prisma-adapter)
