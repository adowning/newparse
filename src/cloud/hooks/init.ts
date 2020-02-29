import { User } from './User'
import { Timesheet } from './Timesheet'
import { Activity } from './Activity'
import { buildHooks } from './buildHooks'
// import { resolve } from 'dns'

// export const makeHooks = async () => {
//   // await initParse()

// }

export default async function(config: ParseConfig): Promise<void> {
  try {
    await buildHooks([User, Timesheet, Activity])
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
  }
}
