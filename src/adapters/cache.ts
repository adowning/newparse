import { RedisCacheAdapter } from 'parse-server'
import myIp from '../cloud/helpers/ipHelper'

export default (): RedisCacheAdapter =>
  // new RedisCacheAdapter({ url: process.env.REDIS_URL || 'redis://redis' })
  new RedisCacheAdapter({ url: `redis://${myIp}:6379` })
