// /* global Parse */
// import QueryCreator from '../helpers/QueryCreator'
// import {sendToSnipe} from '../helpers/snipe-helper.ts'
import fetch from 'node-fetch'

// const CLASS_NAME = 'Activity'
// eslint-disable-next-line no-extend-native
// Date.prototype.addDays = function (days) {
// 	const date = new Date(this.valueOf())
// 	date.setDate(date.getDate() + days)
// 	return date
// }

export default class AssetService {
  static async checkOutHardware(
    authToken: string,
    userAssetId: string,
    hardwareId: number,
    note: string,
  ) {
    try {
      const url = `https://assets.ashdevtools.com/api/v1/hardware/${hardwareId}/checkout`
      const date = new Date()

      const body = {
        checkoutToType: 'user',
        assignedUser: userAssetId,
        // expectedCheckin: date.addDays(1),
        note,
      }

      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { Authentication: `Bearer ${authToken}` },
      })
      return response
    } catch (e) {
      return e.message
    }
  }

  static async getHardwareBySerial(authToken_: string, hardwareId: string) {
    try {
      const url = `https://assets.ashdevtools.com/api/v1/hardware/${hardwareId}/checkout`

      const response = await fetch(url, {
        method: 'get',
        headers: { Authentication: `Bearer ${authToken_}` },
      })
      return response
    } catch (e) {
      return e.message
    }
  }
}
