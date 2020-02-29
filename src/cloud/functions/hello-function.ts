/* global Parse */

Parse.Cloud.define('hello', () => {
	const activity = new Parse.Object('Activity')
	const timesheet = new Parse.Object('Timesheet')
	const q = new Parse.Query(Parse.User).equalTo('username', 'asdf')
	q.first().then(async (u) => {
		timesheet.set('user', u)
		await timesheet.save()
		activity.set('classType', 'Timesheet')
		activity.set('objectReference', 'ddd')
		activity.save()
	})
})
