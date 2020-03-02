/* eslint-disable @typescript-eslint/camelcase */
/* global Parse */
import AnalyticsAddon from './addons/AnalyticsAddon'
import SnipeHelper from '../helpers/SnipeHelper'
import NotificationHelper from '../helpers/NotificationHelper'
import CheckforCompliance from '../usecases/compliance/checkforCompliance'

const analyticsAddon = new AnalyticsAddon()
export const User = {
  addons: [analyticsAddon],
  className: '_User',
  async afterSave(req: any) {
    console.log('after save running')
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
        if (typeof response.payload.id === 'number') {
          o.set('assetsId', response.payload.id)
          await o.save({}, { useMasterKey: true })
          return o
        }
        await o.destroy({}, { useMasterkey: true })
        return o
      } catch (e) {
        return e
      }
    } else {
      console.log('skipping ... exists')
      return o
    }
  },
}

// Parse.Cloud.beforeLogin(async request => {
//   const { object: user } = request
//   // if (!user.get('isInCompliance')) {
//   //   // throw new Error('User is out of compliance.')
//   //   console.log('user is out of compliane')
//   // }
// })

// Parse.Cloud.afterLogin(async request => {
//   const { object: user } = request
//   // CheckforCompliance(user)

//   if (!user.get('isInCompliance')) {
//     // throw new Error('User is out of compliance.')
//     // let currentCount = user.get('complianceWarningCount') as number
//     // NotificationHelper.sendUserMessage(
//     //   `${user.get(
//     //     'firstName',
//     //   )}, you have an item or two to address, please check your notifications panel.`,
//     // )}
//     // eslint-disable-next-line no-plusplus
//     // user.set('currentComplianceCount', currentCount++)
//   }
// })
