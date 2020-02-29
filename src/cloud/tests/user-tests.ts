import Parse from 'parse/node'
import SnipeHelper from '../helpers/SnipeHelper'

export const createUser = async (): Promise<Parse.User> => {
  const user = new Parse.User()
  user.set('username', `test-${new Date().valueOf().toString()}`)
  user.set('password', 'test')
  user.set('firstName', 'test')
  user.set('lastName', 'test')
  await user.signUp()
  return user
}

export const destroyUser = async (user: Parse.User): Promise<void> => {
  console.log(user.get('assetsId'))
  await SnipeHelper.sendToSnipe('delete', '/users', {
    id: user.get('assetsId'),
  })
  await user.destroy({ useMasterKey: true })
  console.log(user)
}
