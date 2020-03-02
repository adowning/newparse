/* eslint-disable func-names */
import PubNub from 'pubnub'

const pubnub = new PubNub({
  subscribeKey: 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d',
  secretKey: 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1',
  // uuid: 'system',
  ssl: true,
})

function publishMessage(message: PubNub.PublishParameters) {
  console.log(
    "Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.",
  )

  pubnub.publish(message, function(status, response) {
    console.log(status, response)
    return response
  })
}
const NotificationHelper = {
  // sendUserMessage"{

  // },
  sendNotification: (
    _message: string,
    // _groups?: Array<Array<Parse.Object>>,
    // individuals?: Array<Parse.Object>,
    channel: string,
  ): void => {
    // const params = new PubNub.PublishParameters()
    const params = {
      message: _message,
      channel,
      storeInHistory: true,
      //   sendByPost: boolean,
      //   meta: any,
      //   ttl: number,
    }
    // let flat = groups.reduce((acc, it) => [...acc, ...it])
    // flat = flat.concat(individuals)
    publishMessage(params as PubNub.PublishParameters)
  },
}

export default NotificationHelper
