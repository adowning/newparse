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
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjczY2RjYjc4ZGJjYjNiMDI5ZTFkZGVjNDI2MmJiMzJkZmM5YjNhMGQ3ZmYxMDFkNDA3MTQ0Mjc3Y2Y3MGY1YmVlZGI0OGY2ZWIwMTVhY2Y1In0.eyJhdWQiOiIxIiwianRpIjoiNzNjZGNiNzhkYmNiM2IwMjllMWRkZWM0MjYyYmIzMmRmYzliM2EwZDdmZjEwMWQ0MDcxNDQyNzdjZjcwZjViZWVkYjQ4ZjZlYjAxNWFjZjUiLCJpYXQiOjE1ODI2Mjk3ODYsIm5iZiI6MTU4MjYyOTc4NiwiZXhwIjoxNjE0MjUyMTg2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Nhd9dHbCJrczVafae9GOka45BwH9mkkeoWp2RCPs3LJRnNb5usfyKmCIpK0Ifz4ICNEJRsZqKCkD7AyZn90Y8Ow38hLEyPGTtenR5eoFaCeLp8t6h0Mr3_5hYaJFlquXUxbPqqhr-e3n2tiCyz9Q0RUtweGy8JtE1a2IC-UB14PCacD4et2PY6N8jv3uN7gI37t3BBZD3eewXjPTVDj_gRTmPCOLUsYJj3CHxzE8ufI0kFeTHhjNQH0XgSnFKz5iJrTsvCzw5y4h3qgPTnXvKvv4Kk6L6YyHDKZa_xJ32vUQduwQK7lyyMhimddTFiqA9IouVRzCyWf59jjJtfsJ9A4LNF83KFIZBShbR7jghe9qgOoN049D2qR0GGJ3F0bBJiw0U_8M2ZhAAaKtROLEYxTataW2KQ2gE_JUhbvFlX8_pYTQq4pbmhAoHjiryxpsIChc8wVmJSPxRFSCWMespiJSh-WRsk7ubu9b54BjITc0fVQRY8Mbz_AEh5T32d4xKpZrDWwK9TjRPACYHFx5iI5vXeuGvq-hXz_vYkBzHfYJBO4lyGcEG9T-_wm3TsD6355NzM6TbTPcoZcW5SxEh5n2bKJkxbq9Q6yJkXDDNw53HZ11IqiAXFVEPNDhciJ4yy-wh5_PbeUvbM3BJJoOec3CNFDItu8-de-_B3Yirdc'

function api<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export const User = {
  addons: [analyticsAddon],
  className: '_User',
  async afterSave(req: Parse.Cloud.AfterSaveRequest) {
    const o = req.object
    if (!o.existed()) {
      const b = {
        firstame: o.get('firstName'),
        lastName: o.get('lastName'),
        password: 'andrews1',
        passwordConfirmation: 'andrews1',
        email: o.get('email'),
        employeeNum: o.get('objectId'),
        username: o.get('username')
      }

      // const response = await instance.post('/users', b)
      // Implementation code where T is the returned data shape

      // Consumer
      api<{ title: string; message: string }>('users')
        .then(({ title, message }) => {
          console.log(title, message)
        })
        .catch(error => {
          /* show error message */
          throw new Error(error)
        })
      // const response: Response = await fetch(baseURL+'/users', {
      // 	method: 'post',
      // 	 body: JSON.stringify(b),
      // 	headers: { Authentication: `Bearer ${authToken}` },
      // })
      // console.log(response)
      // if (typeof response.formData[0].id === 'number') {
      // 	console.log('all good')
      // }
    } else {
      console.log('exists')
    }
  }
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
