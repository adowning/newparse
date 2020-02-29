/* eslint-disable no-console */
// /* global Parse */
// import QueryCreator from '../helpers/QueryCreator'
// import Pushy from 'pushy'
// const Pushy = require('pushy')

// const pushyAPI = new Pushy('0f1d914adce83040454ddf39e2be6cbcdd24f3ca382130cccaa74476340e6e6c')
// const CLASS_NAME = 'Notification'

// export default class NotificationService {
// 	static async send(params: {
// 		user: any
// 		data: any
// 		recipients?: Array<string>
// 		channel?: string
// 	}) {
// 		const message = {
// 			data: params.data,
// 			user: params.user,
// 		}
// 		try {
// 			const res = await pushyAPI.sendPushNotification(

// 				message,
// 				params.recipients || params.channel,
// 			)
// 			return res
// 		} catch (e) {
// 			console.error(e.message)
// 			throw e
// 		}
// 	}
// }
