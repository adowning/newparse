/* global Parse */

// import PubNub from 'pubnub'
import logger from 'parse-server/lib/logger'
import {
  // PubNub,
  PubNubMessageData,
  PubNubPresenceData,
  PubNubStatusData,
} from './pubnub.type'

// eslint-disable-next-line
const PubNub = require('pubnub')

//  const  (request) => {

//     const presence_type = request.message.action;
//     const timestamp = request.message.timestamp;
//     const uuid = request.message.uuid;
//     const occupancy = request.message.occupancy;
//     const data = request.message.data;
//     const channel = request.channels;

//     console.log("Action", presence_type);
//     console.log("UNIX Timestamp", timestamp);
//     console.log("UUID", uuid);
//     console.log("Occupancy", occupancy);
//     console.log("Data", data);
//     console.log("Channel", channel);

//     return request.ok();
// };

export class PubnubHandler {
  public pubnub = new PubNub({
    subscribeKey: 'sub-c-f8d59532-7e01-11e8-9fa1-423cba266524',
    publishKey: 'pub-c-60f6b0bc-29ce-4b3c-9478-aab1cf7e3815',
    secretKey: 'sec-c-ODlhOTQ5ODEtNzJhNi00MzkwLWJkNTktNTkyMGI1YjI3NzI3',
    // uuid: user.get('pubNubId'),
    uuid: 'system',
    ssl: false,
  })

  // private subjectMap = new Map<string, ReplaySubject<any>>()

  constructor() {
    this.pubnub.subscribe({
      channels: ['general'],
      withPresence: true,
    })

    this.initializePubNub()
  }

  private initializePubNub(): void {
    //  pubnub = new PubNub({
    //   subscribeKey: 'sub-c-f8d59532-7e01-11e8-9fa1-423cba266524',
    //   publishKey: 'pub-c-60f6b0bc-29ce-4b3c-9478-aab1cf7e3815',
    //   secretKey: 'sec-c-ODlhOTQ5ODEtNzJhNi00MzkwLWJkNTktNTkyMGI1YjI3NzI3',
    //   // uuid: user.get('pubNubId'),
    //   uuid: 'system',
    //   ssl: false,
    // })
    this.pubnub.hereNow(
      {
        channels: ['general'],
        // channelGroups: [channelGroup],
        includeUUIDs: true,
        includeState: true,
      },
      function(status: any, response: any) {
        logger.info(`status${status}`)
        logger.info(response)
        // handle status + '/' +  response
        // const userList = 	response.channels.occupants
        // forEach(async (recipient: { uuid: any }) => {
        // 		const query = new Parse.Query(Parse.User);
        // 		query.equalTo("pubNubId" + '/' +  recipient.uuid);  // find all the women
        // 		const user= await query.find();
        // 		return user
        // })
      },
    )

    this.pubnub.addListener({
      message: (data: PubNubMessageData) => {
        // const subject = this.subjectMap.get(data.channel)
        // const subject = data.channel
        console.log(data)
        // return data
      },
      // this subject has been set certainly in this.handlePubNubChannelAndGetItsObservable().
      // subject!.next(data.message.data)

      //     message(m) {
      //   if (m.publisher === 'system') {
      //     return null
      //   }
      //   // handle message
      //   const channelName = m.channel // The channel for which the message belongs
      //   const channelGroup = m.subscription // The channel group or wildcard subscription match (if exists)
      //   const pubTT = m.timetoken // Publish timetoken
      //   const msg = m.message // The Payload
      //   const { publisher } = m // The Publisher
      //   logger.info(`${pubTT}/${channelName}/${msg}/${publisher}`)

      presence: (p: PubNubPresenceData) => {
        // handle presence
        const { action } = p // Can be join + '/' +  leave + '/' +  state-change or timeout
        const channelName = p.channel // The channel for which the message belongs
        const { occupancy } = p // No. of users connected with the channel
        // const { state } = p // User State
        const channelGroup = p.subscription //  The channel group or wildcard subscription match (if exists)
        const publishTime = p.timestamp // Publish timetoken
        // const { timetoken } = p // Current timetoken
        // const { uuid } = p // UUIDs of users who are connected with the channel
        logger.info(
          `${action}/${channelName}/${occupancy}/${channelGroup}/${publishTime}`,
        )
      },
      // signal: (s: any) => {
      //   // handle signal
      //   const channelName = s.channel // The channel for which the signal belongs
      //   const channelGroup = s.subscription // The channel group or wildcard subscription match (if exists)
      //   const pubTT = s.timetoken // Publish timetoken
      //   const msg = s.message // The Payload
      //   const { publisher } = s // The Publisher
      //   logger.info(
      //     `${pubTT}/${channelName}/${msg}/${publisher}/${channelGroup}`,
      //   )
      // },
      // user(userEvent: { toString: () => string }) {
      //   logger.info(userEvent.toString())

      //   // for Objects + '/' +  this will trigger when:
      //   // . user updated
      //   // . user deleted
      // },
      // space(spaceEvent: { toString: () => string }) {
      //   logger.info(spaceEvent.toString())

      //   // for Objects + '/' +  this will trigger when:
      //   // . space updated
      //   // . space deleted
      // },
      // membership(membershipEvent: { toString: () => string }) {
      //   logger.info(membershipEvent.toString())

      //   // for Objects + '/' +  this will trigger when:
      //   // . user added to a space
      //   // . user removed from a space
      //   // . membership updated on a space
      // },
      // messageAction(ma: { channel?: any; message?: any; publisher?: any }) {
      //   // handle message action
      //   const channelName = ma.channel // The channel for which the message belongs
      //   const { publisher } = ma // The Publisher
      //   const { event } = ma.message // message action added or removed
      //   const { type } = ma.message.data // message action type
      //   const { value } = ma.message.data // message action value
      //   const { messageTimetoken } = ma.message.data // The timetoken of the original message
      //   const { actionTimetoken } = ma.message.data // The timetoken of the message action
      //   logger.info(
      //     `${publisher}/${channelName}/${type}/${event}/${value}/${messageTimetoken}/${actionTimetoken}`,
      //   )
      // },
      status(s: PubNubStatusData) {
        const { affectedChannelGroups } = s // The channel groups affected in the operation
        const { affectedChannels } = s // The channels affected in the operation
        const { category } = s // Returns PNConnectedCategory
        const { operation } = s // Returns PNSubscribeOperation
        const { lastTimetoken } = s // The last timetoken used in the subscribe request + '/' +  of type long.
        const { currentTimetoken } = s // The current timetoken
        // fetched in the subscribe response + '/' +  which is going to be used in the next request + '/' +  of type long.
        const { subscribedChannels } = s // All the current subscribed channels + '/' +  of type array.
        logger.info(
          `${affectedChannelGroups.toString()}/${affectedChannels}/${category}/${operation}/${lastTimetoken}/${currentTimetoken}/${subscribedChannels}`,
        )
      },
    })
  }
  // constructor() {
  //   const pubnub = new PubNub({
  //     subscribeKey: 'sub-c-f8d59532-7e01-11e8-9fa1-423cba266524',
  //     publishKey: 'pub-c-60f6b0bc-29ce-4b3c-9478-aab1cf7e3815',
  //     secretKey: 'sec-c-ODlhOTQ5ODEtNzJhNi00MzkwLWJkNTktNTkyMGI1YjI3NzI3',
  //     // uuid: user.get('pubNubId'),
  //     uuid: 'system',
  //     ssl: false,
  //   })
  //   pubnub.addListener({

  // })
}

const pubnubHandler = new PubnubHandler()

Parse.Cloud.define('Pubnub_presence', async req => {
  try {
    console.log(pubnubHandler)
    return null
  } catch (e) {
    return e.message
  }
})
