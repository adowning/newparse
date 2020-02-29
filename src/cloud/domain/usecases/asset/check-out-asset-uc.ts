import AssetService from '../../service/AssetService'

const CheckOutAsset = {
	async execute(user: Parse.Object, machineId: string, _note: string) {
		let sequence = Promise.resolve()

		// Loop over each file, and add on a promise to the
		// end of the 'sequence' promise.

		// Chain one computation onto the sequence
		sequence = sequence
			.then(() => AssetService.getHardwareBySerial(user.get('authToken'), machineId))
			.then((result) =>
				AssetService.checkOutHardware(
					user.get('authToken'),
					user.get('userAssetId'),
					result.id,
					_note,
				),
			)
		return sequence
	},
}

export default CheckOutAsset
