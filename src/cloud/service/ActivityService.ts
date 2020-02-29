/* global Parse */
// import QueryCreator from '../helpers/QueryCreator'

const CLASS_NAME = 'Activity'

export default class ActivityService {
	static async add(classType: string, objectReference: Parse.Object, eventType: string) {
		try {
			const ParseActivity = Parse.Object.extend(CLASS_NAME)
			const activity = new ParseActivity()
			activity.set('classType', classType)
			activity.set('objectReference', objectReference)
			activity.set('eventType', eventType)
			await activity.save()
			return activity
		} catch (e) {
			return e.message
		}
	}
}
