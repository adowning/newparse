import { S3Adapter } from 'parse-server'
import myIp from '../cloud/helpers/ipHelper'

const s3overrides = `http://${myIp}:9009`
  ? {
      endpoint: `http://${myIp}:9009`,
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    }
  : {}

export default (): S3Adapter =>
  new S3Adapter({
    bucket: process.env.S3_BUCKET || 'public',
    globalCacheControl: 'public, max-age=31536000',
    s3overrides,
  })
