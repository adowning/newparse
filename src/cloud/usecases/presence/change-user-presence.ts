// import UserService from '../../service/UserService'
import ActivityService from '../../service/ActivityService'

const CreateActivity = {
  async execute(user: Parse.Object, status: string, notify: Array<string>) {
    const oldState = user.get('presenceState')
    switch (status) {
      case 'join':
        user.set('presenceState', 1)
      case 'leave':
        user.set('presenceState', 0)
      case 'timeout':
        user.set('presenceState', 2)
      case 'activity':
        user.set('presenceState', 1)
        break
    }
    user.set('lastPresenceUpdateTime', new Date().valueOf())
    if (user.get('presenceState') != oldState) {
      if (user.get('presenceState') == 0) {
        ActivityService.add('User', user, 'P0')
      } else {
        ActivityService.add('User', user, 'P1')
      }

      user.set('presenceStatus', 1)
      await user.save()
    }
  },
}

export default CreateActivity
