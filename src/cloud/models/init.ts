import Parse from 'parse/node'
import { User } from './User'
import { Timesheet } from './Timesheet'
import { Activity } from './Activity'
import { Analytic } from './Analytic'
import { buildSchemas } from './buildSchemas'

export const schemas = [User, Timesheet, Activity, Analytic]

function initParse({ appId, serverURL, masterKey }: ParseConfig): void {
  Parse.initialize(appId, undefined, masterKey)
  Parse.serverURL = serverURL
}

export default async function(config: ParseConfig): Promise<void> {
  initParse(config)
  try {
    await buildSchemas(schemas)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
  }
}
