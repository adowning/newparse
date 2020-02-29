/* eslint-disable func-names */
import PubNub, { MessageAction } from 'pubnub'
import PushAdapter, {
  PushAdapterBody,
  PushAdapterResponse,
} from 'parse-server/lib/Adapters/Push/PushAdapter'
import { Installation } from 'parse/node'
import Logger from 'parse-server/lib/logger'

// const expo: Expo = new Expo()
const pubnub = new PubNub({
  subscribeKey: 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d',
  secretKey: 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1',
  uuid: 'system',
  ssl: true,
})

class PubNubPushAdapter implements PushAdapter {
  public feature: { immediatePush: boolean }

  constructor() {
    this.feature = { immediatePush: true }
  }

  send(
    {
      data: { alert: body, misc: data, title, priority, badge },
    }: PushAdapterBody,
    installations: Installation[],
  ): Promise<PushAdapterResponse[]> {
    const messages: PubNub.PublishParameters[] = []
    // eslint-disable-next-line no-restricted-syntax
    for (const installation of installations) {
      const { deviceToken, badge: lastBadge } = installation
      // eslint-disable-next-line no-continue
      // if (!Expo.isExpoPushToken(deviceToken)) continue
      messages.push({
        message: body,
        channel: 'general',
        storeInHistory: true,
        //   sendByPost: boolean,
        //   meta: any,
        //   ttl: number,
        // installation,
      })
    }
    const promises: Promise<PushAdapterResponse>[] = messages.map(
      chunk =>
        new Promise((resolve, reject) => {
          pubnub.publish(
            {
              message: chunk.message.body,
              channel: 'general',
              sendByPost: false, // true to send via post
              storeInHistory: false, // override default storage options
              meta: {
                cool: 'meta',
              }, // publish extra meta with the request
            },
            function(status: { error: any }, response: { timetoken: any }) {
              if (status.error) {
                // handle error

                console.log(status)
                resolve({
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  err: status!.error || 'Uknown',
                  // device: chunk[index].installation,
                  transmitted: false,
                })
              }
              console.log('message Published w/ timetoken', response.timetoken)
              resolve({
                err: null,
                // device: chunk[index].installation,
                transmitted: true,
              })
            },
          )
        }),
    )

    // const chunks = expo.chunkPushNotifications(messages)
    // const promises: Promise<PushAdapterResponse[]>[] = chunks.map(
    //   chunk =>
    //     new Promise((resolve, reject) => {
    //       expo
    //         .sendPushNotificationsAsync(chunk)
    //         .then(tickets => {
    //           resolve(
    //             tickets.map((ticket, index) => {
    //               if (ticket.status === 'error')
    //                 return {
    //                   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //                   err: ticket.details!.error || 'Uknown',
    //                   // device: chunk[index].installation,
    //                   transmitted: false,
    //                 }
    //               return {
    //                 err: null,
    //                 // device: chunk[index].installation,
    //                 transmitted: true,
    //               }
    //             }),
    //           )
    //         })
    //         .catch(e => {
    //           reject(e)
    //         })
    //     }),
    // )
    return Promise.all<PushAdapterResponse>(promises).then(resolutions => {
      return resolutions
      // resolutions.reduce(
      //   (p: PushAdapterResponse, c: PushAdapterResponse) => [...p, ...c],
      // )
    })
  }
}

export default (): PubNubPushAdapter => new PubNubPushAdapter()
