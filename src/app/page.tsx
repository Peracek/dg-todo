import { auth } from '@/auth'
import { NewTaskFloatBar } from './_components/NewTaskFloatBar'
import { SignInButton } from './_components/SignInButton'
import { TaskList } from './_components/TaskList'
import prisma from '../db/prismaClient'
import { StoreContextProvider } from '@/db/Store'
import assert from 'assert'
import { OfflineNotificationBar } from './_components/OfflineNotificationBar'

const getUser = async () => {
  const session = await auth()
  const anonymouse = session === null

  if (anonymouse) {
    return { anonymouse, userId: 'FIXME: local storage stored id' }
  }

  const email = session.user?.email
  assert(email, 'Email has to be returned from auth provider')
  return { anonymouse, userId: email }
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignInButton />
        <div>hello {user.userId}</div>
        <NewTaskFloatBar userId={user.userId} />
        <div className="max-w-xl">
          <TaskList />
        </div>
      </main>
    </StoreContextProvider>
  )
}
