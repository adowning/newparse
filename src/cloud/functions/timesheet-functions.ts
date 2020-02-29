/* global Parse */
import ClockUser from '../domain/usecases/timesheet/clock-user-uc'

Parse.Cloud.define('Timesheet_clockUser', async (req) => {
	try {
		return ClockUser(req.user!, req.params.location)
	} catch (e) {
		return e.message
	}
})
