// /* global Parse */
import './hooks'
import './functions/timesheet-functions'
// import QueryCreator from './domain/helpers/QueryCreator'd

// Plug in your Secret API Key
// Get it here: https://dashboard.pushy.me/

// const Parse = require('../utils/Parse')

// export const Cloud = () => {}
// Parse.Cloud.beforeSave(async (request) => {
// 	// const { object: user } = request
// 	// console.log(user)
// })

// Parse.Cloud.beforeLogin(async (request) => {
// 	const { object: user } = request
// 	if (!user.get('isInCompliance')) {
// 		throw new Error('User is out of compliance.')
// 	}
// })

// Parse.Cloud.afterLogin(async (request: { object: any }) => {
// 	const { object: user } = request
// 	const activity = new Parse.Object('Activity')
// 	activity.set('type', 'login')
// 	activity.set('user', user)
// 	return activity.save(activity, {
// 		// useMasterKey: true,
// 	})
// 	// do stuff with user or session here.
// })
// Parse.Push.send(
// 	{
// 		channels: ['news', 'Mets'],
// 		data: {
// 			alert: 'The Giants won against the Mets 2-3.',
// 		},
// 	},
// 	{ useMasterKey: true },
// ).then(
// 	(res) => {
// 		// Push was successful
// 		console.log(res)
// 	},
// 	(error) => {
// 		// Handle error
// 		console.log(error)
// 	},
// )
// Set push payload data to deliver to device(s)
