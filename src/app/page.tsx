import { auth } from '@/auth'
import { StoreContextProvider } from '@/db/StoreContext'
import assert from 'assert'
import prisma from '../db/prismaClient'
import { CreateTaskBar } from './_components/CreateTaskBar'
import { OfflineNotificationBar } from './_components/OfflineNotificationBar'
import { TaskList } from './_components/TaskList'
import { UserInfo } from './_components/UserInfo'

const getUser = async () => {
  const session = await auth()
  const email = session?.user?.email
  assert(email, 'Email has to be returned from auth provider')
  return { userId: email }
}

const getTasks = async (userId: string) =>
  prisma.task.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

export default async function Home() {
  const user = await getUser()
  const tasks = await getTasks(user.userId)

  return (
    <StoreContextProvider tasks={tasks}>
      <OfflineNotificationBar />
      <main className="flex min-h-screen flex-col items-center p-4">
        <UserInfo userId={user.userId} />
        <CreateTaskBar userId={user.userId} />
        <TaskList />
      </main>
    </StoreContextProvider>
  )
}
