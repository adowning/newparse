import PubNub from 'pubnub'

const pubnub = new PubNub({
	subscribeKey: 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d',
	secretKey: 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1',
	uuid: 'system',
	ssl: true
})
function publishSampleMessage() {
    console.log('Since we\'re publishing on subscribe connectEvent, we\'re sure we\'ll receive the following publish.')
    const publishConfig = {
        channel : 'hello_world',
        message : {
            title: 'greeting',
            description: 'hello world!'
        }
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response)
    })
}
const PubNubHelper = {

	sendNotification: (groups: Array<Array<Parse.Object>>, individuals: Array<Parse.Object>, message: string, type: string) => {
        let flat = groups.reduce((acc, it) => [...acc, ...it])
        flat = flat.concat(individuals)
        
	},
}

export default QueryCreator