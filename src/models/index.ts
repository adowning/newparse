import { User } from './User'
import { Timesheet } from './Timesheet'
import { Activity } from './Activity'
import { Analytic } from './Analytic'
import { buildSchemas } from './buildSchemas'

export const schemas = [User, Timesheet, Activity, Analytic]

export const makeSchemas = async () => {
	try {
		await buildSchemas(schemas)
	} catch (e) {
		// eslint-disable-next-line
		console.error(e)
	}
}
