/* global Parse */
import PubNub from 'pubnub'

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
	constructor(user: Parse.Object){
 const pubnub = new PubNub({
	subscribeKey: 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d',
	secretKey: 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1',
	uuid: user.get('pubNubId'),
	ssl: true
}) 
		pubnub.addListener({
		
    message: function(m) {
		if(m.publisher == 'system'){
			return null
		}
		// handle message
        const channelName = m.channel // The channel for which the message belongs
        const channelGroup = m.subscription // The channel group or wildcard subscription match (if exists)
        const pubTT = m.timetoken // Publish timetoken
        const msg = m.message // The Payload
		const publisher = m.publisher //The Publisher
		
		// const user = getUserByPubnubId(m.publisher)
		// const subscribers =  channelGroup.reduce((acc, it) => [...acc, ...it])
        // subscribers = subscribers.concat(membersOfChannel)
		pubnub.hereNow(
			{
				channels: [channelName], 
				channelGroups : [channelGroup],
				includeUUIDs: true,
				includeState: true 
			},
			function (status, response) {
				// handle status, response
			const userList = 	response.channels.occupants
			// forEach(async (recipient: { uuid: any }) => {
			// 		const query = new Parse.Query(Parse.User);
			// 		query.equalTo("pubNubId", recipient.uuid);  // find all the women
			// 		const user= await query.find();
			// 		return user
			// })
			
			}
		)
    },
    presence: function(p) {
        // handle presence
        const action = p.action // Can be join, leave, state-change or timeout
        const channelName = p.channel // The channel for which the message belongs
        const occupancy = p.occupancy // No. of users connected with the channel
        const state = p.state // User State
        const channelGroup = p.subscription //  The channel group or wildcard subscription match (if exists)
        const publishTime = p.timestamp // Publish timetoken
        const timetoken = p.timetoken  // Current timetoken
        const uuid = p.uuid // UUIDs of users who are connected with the channel
    },
    signal: function(s) {
        // handle signal
        const channelName = s.channel // The channel for which the signal belongs
        const channelGroup = s.subscription // The channel group or wildcard subscription match (if exists)
        const pubTT = s.timetoken // Publish timetoken
        const msg = s.message // The Payload
        const publisher = s.publisher //The Publisher
    },
    user: function(userEvent) {
        // for Objects, this will trigger when:
        // . user updated
        // . user deleted
    },
    space: function(spaceEvent) {
        // for Objects, this will trigger when:
        // . space updated
        // . space deleted
    },
    membership: function(membershipEvent) {
        // for Objects, this will trigger when:
        // . user added to a space
        // . user removed from a space
        // . membership updated on a space
    },
    messageAction: function(ma) {
        // handle message action
        const channelName = ma.channel // The channel for which the message belongs
        const publisher = ma.publisher //The Publisher
        const event = ma.message.event // message action added or removed
        const type = ma.message.data.type // message action type
        const value = ma.message.data.value // message action value
        const messageTimetoken = ma.message.data.messageTimetoken // The timetoken of the original message
        const actionTimetoken = ma.message.data.actionTimetoken //The timetoken of the message action
    },
    status: function(s) {
        const affectedChannelGroups = s.affectedChannelGroups // The channel groups affected in the operation, of type array.
        const affectedChannels = s.affectedChannels // The channels affected in the operation, of type array.
        const category = s.category //Returns PNConnectedCategory
        const operation = s.operation //Returns PNSubscribeOperation
        const lastTimetoken = s.lastTimetoken //The last timetoken used in the subscribe request, of type long.
        const currentTimetoken = s.currentTimetoken //The current timetoken fetched in the subscribe response, which is going to be used in the next request, of type long.
        const subscribedChannels = s.subscribedChannels //All the current subscribed channels, of type array.
	
	}

		})}}
