import config from './config'
import throng from 'throng'
import dashboard from 'parse-dashboard'
import express from 'express'
import path from 'path'
import parseServer from './custom-parse-server'
import {
    dashboardConfig,
    dashboardOptions,
    displayEnvironment,
    requireHTTPS,
} from './express-utils'

const start = () => {

    // Create our Express app and force HTTPS
    const app = express()
    app.use(requireHTTPS)

    // Graft on the dashboard
    app.use('/dashboard', dashboard(dashboardConfig, dashboardOptions))
    app.use('/public', express.static(path.join(__dirname, '/public')))
    app.get('/monitor', function (req, res) {
        res.status(204).send()
    })

    // NOTE: Create and mount our Parse Server
    // should FOLLOW all hard coded routes specified by app.get
    // or else it will eat the requests itself.
    app.use(config.MOUNT_PATH, parseServer.create())
    app.listen(config.PORT, displayEnvironment)
}

// Setup NODE Clustering via Throng package
throng({
    workers: config.WORKERS,
    lifetime: Infinity,
    start,
})
