import { RedisCacheAdapter } from 'parse-server'

console.log(process.env.REDIS_URL)
export default (): RedisCacheAdapter =>
  new RedisCacheAdapter({ url: process.env.REDIS_URL || 'redis://redis' })
