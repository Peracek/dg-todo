import { auth } from '@/auth'
import { NewTaskFloatBar } from './_components/NewTaskFloatBar'
import { SignInButton } from './_components/SignInButton'
import { TaskList } from './_components/TaskList'
import prisma from '../db/prismaClient'

export default async function Home() {
  const session = await auth()
  // TODO: filter tasks by author
  const tasks = await prisma.task.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
      <div>hello {session?.user?.name}</div>
      <NewTaskFloatBar />
      <div className="max-w-xl">
        <TaskList tasks={tasks} />
      </div>
    </main>
  )
}
