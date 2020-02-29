/* global Parse */
// import axios from 'axios'
import fetch from 'node-fetch'
import AnalyticsAddon from './addons/AnalyticsAddon'
// import NotificationService from '../../domain/service/NotificationService'
// import CheckOutAsset from '../../domain/usecases/asset/check-out-asset-uc'

const analyticsAddon = new AnalyticsAddon()

// const instance = axios.create({
const baseURL = 'https://assets.ashdevtools.com/api/v1'
const authToken =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MWZiMjljMzg4MzVlN2Q2Y2UxMzlkMWM2ZDNiMWJkMTMzNTAzNjVhOThlMTY2ODRlZjk2Njg4NTYwNmIwZjcxYmE1YmIzYTQzOTgwZmQwIn0.eyJhdWQiOiIxIiwianRpIjoiMzcxZmIyOWMzODgzNWU3ZDZjZTEzOWQxYzZkM2IxYmQxMzM1MDM2NWE5OGUxNjY4NGVmOTY2ODg1NjA2YjBmNzFiYTViYjNhNDM5ODBmZDAiLCJpYXQiOjE1ODI5MzU2NzksIm5iZiI6MTU4MjkzNTY3OSwiZXhwIjoxNjE0NTU4MDc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.icdCLDQqKJSIAyWN3T1Tl4v3SYL2mCBH7hznxrMrnjKkeFdL6PvGhh0yu37d4_530fYHIhdz8IKVHhdcCHoFh0AJc1GBAUN1hvua6r5dEbwPNyqLV59mup7YvgJHw5cjPnhxQwp2WbMID2F4_csQUHFSDBlfe2iACgTwasNEGzdvZP26ltOII9i-YbgC-PlanS6x97cmsPrQ56CyvC_VCm_Cc9CdI7j4yHUfukpMkbl6P6-Tkxp1XR2zZCGWzhd8RjZ2ytMDGmGnlucG0r6-QHU_R9bMFb4lEh1BPpnP8EBsblimYeGZXIMLVFLXcpWVrniRrP7w-nfqWUZWNxMeliaJ7KDdDRteNChpktQO-64gcUtJox8y3sGTSFmwwtlhWr2LwiaPC0wcfAWKbq28yuZ46PFcnx_NjgDYr8WDq8-BfU_79_RyQAwPD8LaVj94ed4heBSyvcqdpnSxqIXvG7eGyKhPzdA-hmQJqZ4kLFpNmDE1rkdPP60jRTo_gM_pWTPAuynU4HVqaHAUWI2ywLKxEA4kp0gFqqbIo03guAAS2L0Ubris_ri25WiIKEa7hHzOnpYiJy5Krgn0p2F8ScwdBo5OHhQG2SHFxhan71gZbXM82PVqlA_AEi-Nc3Em-a5MTE_8Z9pxRunYjhXcsj7cgmqotV71iBzAgu7sKHY'
// function api<T>(url: string): Promise<T> {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText)
//     }
//     return response.json()
//   })
// }

export const User = {
  addons: [],
  className: '_User',
  async afterSave(req: { object: any }) {
    const o = req.object as Parse.User
    if (!o.existed()) {
      const body = {
        firstame: o.get('firstName'),
        lastName: o.get('lastName'),
        password: 'andrews1',
        passwordConfirmation: 'andrews1',
        email: o.get('email'),
        employeeNum: o.get('objectId'),
        username: o.get('username'),
      }
      // const response = await instance.post('/users', b)
      // Implementation code where T is the returned data shape
      // const fn = o.get('firstName')
      // const ln = o.get('lastName')
      // const email = o.get('email')
      // const username = o.get('username')
      // const username = o.get('objectId')
      // Consumer
      console.log(authToken)
      const response: any = await fetch(
        `https://assets.ashdevtools.com/api/v1/users`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authentication: authToken,
          },
        },
      )
      console.log(response.body)
      // console.log(response.data.status)
      if (typeof response.id === 'number') {
        console.log('all good')
      }
    } else {
      console.log('exists')
    }
  },
}

// Parse.Cloud.beforeLogin(async request => {
//   const { object: user } = request
//   // CreateActivity.execute(user, 0, [])
//   console.log(request)

//   if (!user.get('isInCompliance')) {
//     // throw new Error('User is out of compliance.')
//     console.log('user is out of compliane')
//   }
// })

// Parse.Cloud.afterLogin(async (request: { object: any }) => {
// 	const { object: _user } = request
// 	const to = '/topics/news'
// 	_user.set('isOnline', true)
// 	console.log(request)
// 	await Promise.all([
// 		CheckOutAsset.execute({
// 			user: _user,
// 			machineId: request.params.machineId,
// 			note: 'auto from login',
// 		}),
// 	])
// 	const params = {
// 		user: _user,
// 		data: 'Hai2u',
// 		// recpients: to,
// 		channel: to,
// 	}
// 	NotificationService.send(params)
// 	// const activity = new Parse.Object('Activity')
// 	// activity.set('type', 'login')
// 	// activity.set('user', user)
// 	// activity.save(activity, {
// 	// 	// useMasterKey: true,
// 	// })
// 	// do stuff with user or session here.
// })
