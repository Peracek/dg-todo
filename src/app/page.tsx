import { auth } from '@/auth'
import { StoreContextProvider } from '@/db/StoreContext'
import assert from 'assert'
import prisma from '../db/prismaClient'
import { NewTaskFloatBar } from './_components/NewTaskFloatBar'
import { OfflineNotificationBar } from './_components/OfflineNotificationBar'
import { TaskList } from './_components/TaskList'
import { UserInfo } from './_components/UserInfo'

const getUser = async () => {
  const session = await auth()
  const email = session?.user?.email
  assert(email, 'Email has to be returned from auth provider')
  return { userId: email }
}

const getTasks = async (userId: string | null) =>
  prisma.task.findMany({
    where: {
      authorId: userId,
    },
  })

export default async function Home() {
  const user = await getUser()
  const tasks = await getTasks(user.userId)

  return (
    <StoreContextProvider tasks={tasks}>
      <OfflineNotificationBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <UserInfo userId={user.userId} />
        <NewTaskFloatBar userId={user.userId} />
        <TaskList />
      </main>
    </StoreContextProvider>
  )
}
