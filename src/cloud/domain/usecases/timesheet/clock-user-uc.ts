import TimesheetService from '../../service/TimesheetService'

const ClockUser = async (user: Parse.User, location: Parse.GeoPoint) => {
	if (!user) {
		return 'no user'
	}
	const activeSheet = await TimesheetService.getActiveTimesheetForUser(user!)
	const now = new Date().valueOf()

	if (activeSheet) {
		activeSheet.set('endTimestamp', new Date().valueOf())
		activeSheet.set('endLocation', location)
		activeSheet.set('status', 1)
		await activeSheet.save()
		user.set('clockStatus', false)
	} else {
		await TimesheetService.add({
			user,
			endTimestamp: new Date().valueOf(),
			startTimestamp: new Date().valueOf(),
			status: 0,
		})
		user.set('clockStatus', true)
	}
	user.set('lastLocationTimestamp', now)
	user.set('lastClockTimestamp', now)
	user.set('lastLocation', location)
	await user.save()
	return user
}

export default ClockUser
