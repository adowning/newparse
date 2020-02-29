import PubNub from 'pubnub'
import logger from 'parse-server/lib/logger'

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

export default class PubnubRouter {
  constructor(user: Parse.Object) {
    const pubnub = new PubNub({
      subscribeKey: 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d',
      secretKey: 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1',
      uuid: user.get('pubNubId'),
      ssl: true,
    })
    pubnub.addListener({
      message(m: {
        publisher: any
        channel?: any
        subscription?: any
        timetoken?: any
        message?: any
      }) {
        if (m.publisher === 'system') {
          return null
        }
        // handle message
        const channelName = m.channel // The channel for which the message belongs
        const channelGroup = m.subscription // The channel group or wildcard subscription match (if exists)
        const pubTT = m.timetoken // Publish timetoken
        const msg = m.message // The Payload
        const { publisher } = m // The Publisher
        logger.info(`${pubTT}\n${channelName}\n${msg}\n${publisher}`)

        pubnub.hereNow(
          {
            channels: [channelName],
            channelGroups: [channelGroup],
            includeUUIDs: true,
            includeState: true,
          },
          function(status: any, response: any) {
            logger.info(status)
            logger.info(response)
            // handle status, response
            // const userList = 	response.channels.occupants
            // forEach(async (recipient: { uuid: any }) => {
            // 		const query = new Parse.Query(Parse.User);
            // 		query.equalTo("pubNubId", recipient.uuid);  // find all the women
            // 		const user= await query.find();
            // 		return user
            // })
          },
        )
        return null
      },
      presence(p: {
        channel?: any
        subscription?: any
        timestamp?: any
        action?: any
        occupancy?: any
        state?: any
        timetoken?: any
        uuid?: any
      }) {
        // handle presence
        const { action } = p // Can be join, leave, state-change or timeout
        const channelName = p.channel // The channel for which the message belongs
        const { occupancy } = p // No. of users connected with the channel
        const { state } = p // User State
        const channelGroup = p.subscription //  The channel group or wildcard subscription match (if exists)
        const publishTime = p.timestamp // Publish timetoken
        const { timetoken } = p // Current timetoken
        const { uuid } = p // UUIDs of users who are connected with the channel
        logger.info(
          `${action}\n${channelName}\n${occupancy}\n${state}\n${channelGroup}\n${publishTime}\n${timetoken}\n${uuid}`,
        )
      },
      signal(s: {
        channel?: any
        subscription?: any
        timetoken?: any
        message?: any
        publisher?: any
      }) {
        // handle signal
        const channelName = s.channel // The channel for which the signal belongs
        const channelGroup = s.subscription // The channel group or wildcard subscription match (if exists)
        const pubTT = s.timetoken // Publish timetoken
        const msg = s.message // The Payload
        const { publisher } = s // The Publisher
        logger.info(
          `${pubTT}\n${channelName}\n${msg}\n${publisher}\n${channelGroup}`,
        )
      },
      user(userEvent: any) {
        logger.info(userEvent)

        // for Objects+ '\n' +  this will trigger when:
        // . user updated
        // . user deleted
      },
      space(spaceEvent: any) {
        logger.info(spaceEvent)

        // for Objects+ '\n' +  this will trigger when:
        // . space updated
        // . space deleted
      },
      membership(membershipEvent: any) {
        logger.info(membershipEvent)

        // for Objects+ '\n' +  this will trigger when:
        // . user added to a space
        // . user removed from a space
        // . membership updated on a space
      },
      messageAction(ma: { channel?: any; message?: any; publisher?: any }) {
        // handle message action
        const channelName = ma.channel // The channel for which the message belongs
        const { publisher } = ma // The Publisher
        const { event } = ma.message // message action added or removed
        const { type } = ma.message.data // message action type
        const { value } = ma.message.data // message action value
        const { messageTimetoken } = ma.message.data // The timetoken of the original message
        const { actionTimetoken } = ma.message.data // The timetoken of the message action
        logger.info(
          `${publisher}\n${channelName}\n${type}\n${event}\n${value}\n${messageTimetoken}\n${actionTimetoken}`,
        )
      },
      status(s: {
        affectedChannelGroups?: any
        affectedChannels?: any
        category?: any
        operation?: any
        lastTimetoken?: any
        currentTimetoken?: any
        subscribedChannels?: any
      }) {
        const { affectedChannelGroups } = s // The channel groups affected in the operation
        const { affectedChannels } = s // The channels affected in the operation
        const { category } = s // Returns PNConnectedCategory
        const { operation } = s // Returns PNSubscribeOperation
        const { lastTimetoken } = s // The last timetoken used in the subscribe request+ '\n' +  of type long.
        const { currentTimetoken } = s // The current timetoken
        // fetched in the subscribe response+ '\n' +  which is going to be used in the next request+ '\n' +  of type long.
        const { subscribedChannels } = s // All the current subscribed channels+ '\n' +  of type array.
        logger.info(
          `${affectedChannelGroups.toString()}\n${affectedChannels}\n${category}\n${operation}\n${lastTimetoken}\n${currentTimetoken}\n${subscribedChannels}`,
        )
      },
    })
  }
}
