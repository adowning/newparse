export const Timesheet = {
	className: 'Timesheet',
	fields: {
		objectId: { type: 'String' },
		createdAt: {
			type: 'Date',
		},
		updatedAt: {
			type: 'Date',
		},
		ACL: { type: 'ACL' },
		notes: { type: 'Array', defaultValue: ['initial'] },
		status: { type: 'Number', defaultValue: 0 },
		startTimestamp: { type: 'Number', defaultValue: new Date().valueOf() },
		startTime: { type: 'Date' },
		approved: { type: 'Boolean', defaultValue: false },
		duration: { type: 'Number', defaultValue: 0 },
		user: { type: 'Pointer', targetClass: '_User', required: true },
	},
	indexes: { objectId: { objectId: 1 } },
	classLevelPermissions: {
		find: { '*': true },
		count: {},
		get: { '*': true },
		update: { requiresAuthentication: true },
		create: { '*': true },
		delete: { requiresAuthentication: true },
		addField: {},
		protectedFields: {
			'*': ['notes', 'status', 'startTimestamp', 'startTime', 'approved', 'duration', 'user'],
		},
	},
}
