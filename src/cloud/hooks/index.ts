import { User } from './User'
import { Timesheet } from './Timesheet'
import { Activity } from './Activity'
import { buildHooks } from './buildHooks'

export const makeHooks = async () => {
	// await initParse()

	try {
		await buildHooks([User, Timesheet, Activity])
	} catch (e) {
		// eslint-disable-next-line
		console.error(e)
	}
}

makeHooks()
