/* eslint-disable @typescript-eslint/camelcase */
/* global Parse */
import AnalyticsAddon from './addons/AnalyticsAddon'
import SnipeHelper from '../helpers/SnipeHelper'

const analyticsAddon = new AnalyticsAddon()
export const User = {
  addons: [analyticsAddon],
  className: '_User',
  async afterSave(req: any) {
    const o = req.object
    if (!o.existed()) {
      const b = {
        first_name: o.get('firstName'),
        last_name: o.get('lastName'),
        password: 'andrews1',
        password_confirmation: 'andrews1',
        email: o.get('email'),
        employeeNum: o.id,
        username: o.get('username'),
      }
      try {
        const response: any = await SnipeHelper.sendToSnipe('post', '/users', b)
        console.log(response.payload)
        if (typeof response.payload.id === 'number') {
          console.log('all good', typeof o)
          o.set('assetsId', response.payload.id)
          await o.save({}, { useMasterKey: true })
          console.log('all good')

          return o
        }
        await o.destroy({}, { useMasterkey: true })
        return o
      } catch (e) {
        return e
      }
    } else {
      console.log('exists')
      return o
    }
  },
}

Parse.Cloud.beforeLogin(async request => {
  const { object: user } = request
  // CreateActivity.execute(user, 0, [])
  console.log(request)

  if (!user.get('isInCompliance')) {
    // throw new Error('User is out of compliance.')
    console.log('user is out of compliane')
  }
})
