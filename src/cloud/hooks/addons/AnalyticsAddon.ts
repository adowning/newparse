/* eslint-disable class-methods-use-this */
import * as Parse from 'parse/node'

/**
 * Saves an analytic each time an object is created
 */
export default class AnalyticsAddon {
  async afterSave(req: { object: any }) {
    // this.obj = req.object
    const o = req.object
    // console.log(o.toJSON())
    const analytic = new Parse.Object('Analytic')
    analytic.set('classType', o.className)
    analytic.set('objectReference', o.id)

    if (!o.existed()) {
      analytic.set('event', 'created')
    } else {
      analytic.set('event', 'updated')
    }
    await analytic.save()

    return o
  }
}
