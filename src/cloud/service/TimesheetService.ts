/* eslint-disable no-console */
/* global Parse */
import QueryCreator from '../helpers/QueryCreator'

const CLASS_NAME = 'Timesheet'

export default class TimesheetService {
	static async getActiveTimesheetForUser(user: Parse.User): Promise<Parse.Object | null> {
		const activeTimesheetQuery = QueryCreator.createQuery(CLASS_NAME)
		activeTimesheetQuery.equalTo('userId', user!.id)
		activeTimesheetQuery.equalTo('status', 0)
		const activeTimesheet = await activeTimesheetQuery.first()
		return activeTimesheet || null
	}

	static async getActiveTimesheets(): Promise<Array<Parse.Object>> {
		const activeTimesheetQuery = QueryCreator.createQuery(CLASS_NAME)
		activeTimesheetQuery.equalTo('status', 0)
		const activeTimesheet = await activeTimesheetQuery.find()
		return activeTimesheet
	}

	static async add(params: {
		user: any;
		startTimestamp: number;
		endTimestamp: number;
		status: number;
	}) {
		try {
			const ParseTimesheet = Parse.Object.extend(CLASS_NAME)
			const timesheet = new ParseTimesheet()
			timesheet.set('user', params.user)
			timesheet.set('startTimestamp', params.startTimestamp)
			timesheet.set('status', params.status)
			timesheet.set('endTimestamp', params.endTimestamp)

			return await timesheet.save()
		} catch (e) {
			console.error(e.message)
			throw e
		}
	}
}
