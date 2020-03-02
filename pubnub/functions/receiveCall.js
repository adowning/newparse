export default (request, response) => {
  const pubnub = require('pubnub')
  const kvstore = require('kvstore')
  const xhr = require('xhr')

  let headersObject = request.headers
  let paramsObject = request.params
  let methodString = request.method
  let bodyString = request.body

  // console.log('request',request); // Log the request envelope passed
  // Query parameters passed are parsed into the request.params object for you
  // console.log(paramsObject.a) // This would print "5" for query string "a=5

  // Set the status code - by default it would return 200
  response.status = 200
  // Set the headers the way you like
  response.headers['X-Custom-Header'] = 'CustomHeaderValue'

  return request
    .json()
    .then(body => {
      if (body === null) {
        return response.send(body)
      } else {
        if (body.type !== 'call.recording.uploaded') {
          var flatted = flatten(body)
          var callEvent = setDirectionAndSetNumbers(flatted)
          recordEvent(callEvent).then(recordedEvent => {
            console.log('34', recordedEvent)
            updateClients(recordedEvent).then(updatedEvent => {
              console.log('36', updatedEvent)
              lookupCustomer(updatedEvent).then(customerList => {
                console.log(customerList)
              })
            })
          })
        }
        return response.send(body)
      }
    })
    .catch(err => {
      console.error(err)
      return response.send('Malformed JSON body.')
    })
}

function lookupCustomer(number) {
  return new Promise(function(resolve, reject) {
    var xhr = require('xhr')

    const http_options = {
      method: 'POST', // or PUT
      body: `{ \"params\": \"query=${number}&hitsPerPage=10&getRankingInfo=1&restrictSearchableAttributes=phone1&attributesToHighlight=phone1,accountName\" }`,
      headers: {
        'X-Algolia-API-Key': '2ed6f5748d1b4256ec19f9616b067b0d',
        'X-Algolia-Application-Id': '59EXPAJLR4',
      },
    }
    // xhr.send(data);
    xhr
      .fetch(
        'https://59EXPAJLR4-dsn.algolia.net/1/indexes/customers/query',
        http_options,
      )
      .then(result => {
        console.log(result)
        resolve(result.hits)
      })
  })
}

function recordEvent(callEvent) {
  return new Promise(function(resolve, reject) {
    var db = require('kvstore')
    db.get(`callRecord-${callEvent.callId}`).then(callRecord => {
      var eventType = callEvent.type
      eventType = eventType.replace('call.dialog.', '')
      if (callRecord) {
        callRecord.currentStage = eventType
        callRecord.recordedStages = callRecord.recordedStages.push(eventType)
        db.set(`callRecord-${callRecord.callId}`, callRecord).then(x => {
          resolve(callRecord)
        })
      } else {
        let newRecord = Object.assign({}, callEvent)
        newRecord.currentStage = eventType
        newRecord.recordedStages = []
        newRecord.recordedStages.push(eventType)
        newRecord.sentStages = []
        db.set(`callRecord-${newRecord.callId}`, newRecord).then(x => {
          resolve(newRecord)
        })
      }
    })
  })
}
function flatten(body) {
  var flattened = {
    callId: body.payload.callId,
    toUri: body.payload.toUri,
    fromUri: body.payload.fromUri,
    type: body.type,
    createdAt: body.createdAt,
    streamId: body.payload.streamId,
  }
  return flattened
}

function formatPartnerNumber(_number) {
  var number = _number.replace('sip:', '')
  number = number.replace('+', '')
  number = number.replace('@jnctn.net', '')
  number = number.replace('@andrewsgroup.onsip.com', '')
  return number
}

function setDirectionAndSetNumbers(body) {
  var addresses = getCompanySipAddresses()
  addresses.forEach(address => {
    if (body.toUri == address.address) {
      body.direction = 'incoming'
      body.partnerNumber = formatPartnerNumber(body.fromUri)
    }
    if (body.fromUri == address.address) {
      body.direction = 'outgoing'
      body.partnerNumber = formatPartnerNumber(body.toUri)
    }
    body.employee = address.employeeId
  })
  return body
}

function getCompanySipAddresses() {
  const addresses = [
    { address: 'sip:ash@andrewsgroup.onsip.com', employeeId: 'fiCU1DB2Dq' },
  ]
  return addresses
}

function updateClients(recordedEvent) {
  // var formattedBody = flatten(body)
  //  formattedBody = setDirectionAndSetNumbers(body)
  return new Promise(function(resolve, reject) {
    var db = require('kvstore')
    var pubnub = require('pubnub')

    var request = {}
    request.message = recordedEvent
    request.type = 'callUpdate'
    pubnub.publish({
      channel: 'general',
      message: request.message,
    })
    console.log(recordedEvent.sentStages)
    recordedEvent.sentStages = recordedEvent.sentStages.push(currentStage)
    console.log(recordedEvent.sentStages)

    db.set(`callRecord-${recordEvent.callId}`, recordEvent).then(x => {
      resolve(recordEvent)
    })
  })
}
