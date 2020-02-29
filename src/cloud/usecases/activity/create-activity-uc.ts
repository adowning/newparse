import ActivityService from '../../service/ActivityService'

const CreateActivity = {
	async execute(reference: Parse.Object, status: string, notify: Array<string>) {
		if (notify.length > 0) {
			console.log(notify)
		}
		await ActivityService.add(reference.className, reference, status)
	},
}

export default CreateActivity
