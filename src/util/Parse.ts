import Parse from 'parse/node'
// import '../.env'

// console.log('key', process.env.MASTER_KEY)
import { MASTER_KEY, SERVER_URL, APP_ID } from '../util/secrets'
console.log('key', process.env.SERVER_URL)
Parse.initialize(APP_ID, undefined, MASTER_KEY)
Parse.serverURL = SERVER_URL

export default Parse
