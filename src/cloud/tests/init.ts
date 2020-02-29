import Parse from 'parse/node'
import { createUser, destroyUser } from './user-tests'

export default async function(): Promise<void> {
  try {
    const user = await createUser()
    console.log(user)
    await destroyUser(user)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
  }
}
