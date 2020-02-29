import config from '../config'
import { ParseServer } from 'parse-server'

interface ParseOptions {
    appId?: string;
    appName?: string;
    cloud?: string;
    cluster?: number | boolean;
    databaseURI?: string;
    logLevel?: 'error' | 'none' | 'info' | 'verbose';
    masterKey?: string;
    publicServerURL?: string;
    serverURL?: string;
    silent?: string;
    verbose?: boolean;
}

export default {
    create: (options?: ParseOptions) => {
        // NOTE: Allows custom options, useful for E2E testing
        const overrides = options || {},
            verbose = config.PARSE_LOG_VERBOSE || false,
            silent = config.PARSE_SILENT || false,
            logLevel = (verbose) ? undefined : 'error'

        return new ParseServer({
            appId: overrides.appId || config.APP_ID,
            appName: overrides.appName || config.APPLICATION_NAME,
            cloud: `./dist/${overrides.cloud || config.CLOUD_CODE_MAIN}`,
            cluster: overrides.cluster || config.WORKERS,
            databaseOptions: {
                reconnectInterval: 1500,
                reconnectTries: 20,
                poolSize: config.POOL_SIZE,
                connectTimeoutMS: 25000,
                socketTimeoutMS: 25000,
            },
            databaseURI: overrides.databaseURI || config.DATABASE_URI,
            logLevel: overrides.logLevel || logLevel,
            masterKey: overrides.masterKey || config.MASTER_KEY,
            maxUploadSize: '5mb',
            publicServerURL: overrides.publicServerURL || config.PUBLIC_SERVER_URL,
            serverURL: overrides.serverURL || config.SERVER_URL,
            silent: overrides.silent || silent,
            verbose: overrides.verbose || verbose,
            allowClientClassCreation: false,
        })
    },
}
