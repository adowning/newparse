import logger from 'parse-server/lib/logger'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.dev' })
}
// eslint-disable-next-line import/first
import { App, InitClasses } from './app'

App.listen(process.env.PORT || 1337, async () => {
  await InitClasses()
  // await InitTests()
  // if (process.env.NODE_ENV === 'development') {
  //   await InitTests
  // }
  logger.info(`⚡️ Server listening on port ${process.env.PORT || 1337}!`)
})
