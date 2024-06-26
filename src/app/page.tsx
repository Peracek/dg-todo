import prisma from '../db/prismaClient'

import { signIn, useSession } from 'next-auth/react'
import { TaskList } from './_components/TaskList'

const NewTaskBar = () => {
  return <div className="card card-hover">vytvorit poznamku</div>
}

const AuthStatus = () => {
  const session = useSession()

  return <div>{session.data?.user?.email}</div>
}

export default async function Home() {
  const tasks = await prisma.task.findMany()

  return (
    // <SessionProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <button onClick={() => signIn()}>Sign in</button> */}
      {/* <AuthStatus /> */}
      <NewTaskBar />
      <div className="max-w-xl">
        <TaskList tasks={tasks} />
      </div>
    </main>
    // </SessionProvider>
  )
}
