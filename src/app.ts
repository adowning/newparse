import path from 'path'
import http from 'http'
import express, { Application } from 'express'
import { ParseServer } from 'parse-server'
import ParseDashboard from 'parse-dashboard'

import initClasses from './cloud/models/init'
import initHooks from './cloud/hooks/init'
import initTests from './cloud/tests/init'

import { filesAdapter, cacheAdapter } from './adapters'

const [appId, masterKey, serverURL] = [
  process.env.APP_ID || 'AndrewsApp',
  process.env.MASTER_KEY || 'Asdfasdf1234',
  `http://localhost:${process.env.PORT || 1337}/api`,
]

const [app, api, dashboard] = [
  express(),
  new ParseServer({
    databaseURI:
      `${process.env.DATABASE_URI}/${appId}` || `mongodb://db:27017/${appId}`,
    cloud: path.join(__dirname, 'cloud', 'main.ts'),
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
