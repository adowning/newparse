import AnalyticsAddon from './addons/AnalyticsAddon'

const analyticsAddon = new AnalyticsAddon()

export const Timesheet = {
	addons: [analyticsAddon],
	className: 'Timesheet',
	// async beforeSave(req: any) {
	// 	console.log('asdf')
	// 	return req
	// },
}
