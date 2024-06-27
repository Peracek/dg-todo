import { signOut } from '@/auth'

export const UserInfo = ({ userId }: { userId: string }) => (
  <div className="w-full text-right text-sm">
    logged in as {userId} |{' '}
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className="inline"
    >
      <button type="submit">signout</button>
    </form>
  </div>
)
