import express from 'express'


import { makeSchemas } from './models'
import { ParseServer } from 'parse-server'
import path from 'path'
import { MONGODB_URI, APP_ID, MASTER_KEY, SERVER_URL, PORT } from './util/secrets'

export default () =>
	new Promise((resolve) => {
		//	const serverURL = `http://localhost:${process.env.PORT}/parse`

		const server = ParseServer.start({
			databaseURI: MONGODB_URI,
			cloud: path.join(__dirname, 'cloud', 'index.js'),
			appId: APP_ID,
			// directAccess: true,
			protectedFields: [],
			masterKey: MASTER_KEY,
			serverURL: `${SERVER_URL}`,
			// publicServerURL: `${process.env.SERVER_URL}/parse`,
			port: Number(PORT),
			startLiveQueryServer: true,
			appName: 'AndrewsApp',
			// serverURL,
			// emailAdapter: {
			// 	module: '@parse/simple-mailgun-adapter',
			// 	options: {
			// 		fromAddress: process.env.FROM_ADDRESS || 'heythere@goodpeopleapp.com.br',
			// 		domain: 'goodpeopleapp.com.br',
			// 		apiKey: 'key-37ae3fac3da8d1849ce8f140ca2a16a0',
			// 	},
			// },
			serverStartComplete: async () => {
                console.log('making schemas')
				await makeSchemas()
				resolve(server)
			},
		})
    })
    
