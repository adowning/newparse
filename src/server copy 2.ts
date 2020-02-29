import errorHandler from 'errorhandler'
import ParseServer from 'parse-server'
import path from 'path'
import express from 'express'
const app = express()
import { MONGODB_URI, APP_ID, MASTER_KEY, SERVER_URL, PORT } from './util/secrets'
import { makeSchemas } from './models'

app.set('port', PORT || 3000)
const parseServer = () => {
 return new Promise((resolve: (arg0: import('http').Server) => void) => {
    //	const serverURL = `http://localhost:${process.env.PORT}/parse`

    const parseServer = ParseServer.start({
    databaseURI: MONGODB_URI,
    cloud: path.join(__dirname, 'cloud', 'index.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    serverURL: `${SERVER_URL}/parse`,
    publicServerURL: `${SERVER_URL}/parse`,
    appName: APP_ID,
    // emailAdapter: {
    //     module: '@parse/simple-mailgun-adapter',
    //     options: {
    //         fromAddress: FROM_ADDRESS || 'heythere@goodpeopleapp.com.br',
    //         domain: 'goodpeopleapp.com.br',
    //         apiKey: 'key-37ae3fac3da8d1849ce8f140ca2a16a0'
    //     }
    // }
    serverStartComplete: async () => {
        console.log('making schemas')
        await makeSchemas()
        resolve(parseServer)
    },
})
app.use(errorHandler())

app.use('/parse', parseServer)
app.listen(app.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')
})

})}
parseServer()
//  app.use('/parse', parseServer)
/**
 * Error Handler. Provides full stack - remove for production
 */

// server.expressApp.use('/dashboard', dashboard)
// app.use('/parse', api)

/**
 * Start Express server.
 */
// const server = app.listen(app.get('port'), () => {
//     console.log(
//         '  App is running at http://localhost:%d in %s mode',
//         app.get('port'),
//         app.get('env')
//     )
//     console.log('  Press CTRL-C to stop\n')
// })

// export default server
