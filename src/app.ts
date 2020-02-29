import path from 'path'
import http from 'http'
import express, { Application } from 'express'
import { ParseServer } from 'parse-server'
import ParseDashboard from 'parse-dashboard'
import os from 'os'
import initClasses from './cloud/models/init'
import initHooks from './cloud/hooks/init'
import initTests from './cloud/tests/init'

import { filesAdapter, cacheAdapter } from './adapters'

const ifaces = os.networkInterfaces()

const [appId, masterKey, serverURL, nodeEnv] = [
  process.env.APP_ID || 'AndrewsApp',
  process.env.MASTER_KEY || 'Asdfasdf1234',
  `http://localhost:${process.env.PORT || 1337}/api`,
  process.env.NODE_ENV,
]
let extension = '.js'
if (process.env.NODE_ENV === 'development') {
  extension = '.ts'
}
const myIp = ''

Object.keys(ifaces).forEach(function(ifname) {
  let alias = 0

  ifaces[ifname].forEach(function(iface) {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses

      if (ifname !== 'docker0') {
        console.log(`${ifname}:${alias}`, iface.address)
      }
    } else {
      // this interface has only one ipv4 adress
      // if (ifname !== 'docker0') {
      //   ifname !== 'docker0'
      // }
      console.log(`${ifname}:${alias}`, iface.address)

      if (ifname !== 'docker0') {
        console.log(`${ifname}:${alias}`, iface.address)
      }
    }
    // eslint-disable-next-line no-plusplus
    ++alias
  })
})

console.log(`${process.env.NODE_ENV}`)
const [app, api, dashboard] = [
  express(),
  new ParseServer({
    databaseURI:
      `${process.env.DATABASE_URI}/${nodeEnv}` || `mongodb://db:27017/${appId}`,
    cloud: path.join(__dirname, 'cloud', `main${extension}`),
    appId,
    masterKey,
    serverURL,
    liveQuery: {
      classNames: ['Routes'],
    },
    allowClientClassCreation: false,
    enableAnonymousUsers: false,
    filesAdapter,
    cacheAdapter,
    serverStartComplete: async (): Promise<void> => {
      if (process.env.NODE_ENV === 'development') {
        await initHooks({ appId, serverURL, masterKey })
        await initTests()
      }
    },
  }),
  new ParseDashboard(
    {
      apps: [
        {
          serverURL,
          appId,
          appName: appId,
          masterKey,
          supportedPushLocales: ['en', 'pt'],
        },
      ],
      users: [
        {
          user: process.env.DASHBOARD_USERNAME || 'admin',
          pass: process.env.DASHBOARD_PASSWORD || 'asdfasdf',
        },
      ],
    },
    {
      allowInsecureHTTP: true,
    },
  ),
]

app.use('/api', api as Application)
app.use('/dashboard', dashboard as Application)

export const App = http.createServer(app)
export const InitClasses = async (): Promise<void> =>
  initClasses({ appId, serverURL, masterKey })
// export const InitHooks = async (): Promise<void> =>
// initHooks({ appId, serverURL, masterKey })
// export const InitTests = async (): Promise<void> => initTests()
ParseServer.createLiveQueryServer(App)
