var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

function deploy() {
  var scriptPath = __dirname + '/deploy.sh';
  child_process.execFile(scriptPath, function(err, stdout, stderr) {
    console.log('--> EXEC ' + scriptPath);
    if (err) {
      console.error(err.stack);
    } else {
      console.error(stderr);
      console.log(stdout);
    }
    console.log('--- END ' + scriptPath);
  });
}

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
	deploy()
})

// handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title)
// })
