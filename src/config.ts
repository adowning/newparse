import dotenv from 'dotenv'
dotenv.config()

// NOTE: Two helper functions for specifying env variables and defaults
const optional = <T extends string | number | boolean>(
        name: string,
        fallback: T
    ): string | T => process.env[name] || fallback,
    required = (name: string): string => process.env[name] ||
    (console.error('Missing required env var: ' + name), process.exit(1)) // eslint-disable-line no-console

const mountPath      = optional('PARSE_MOUNT', '/api'),
    port             = optional('PORT', 5000),
    rootUrl          = optional('ROOT_URL', 'http://localhost:' + port),
    serverUrl        = optional('SERVER_URL', rootUrl + mountPath),
    publicServerUrl  = optional('PUBLIC_SERVER_URL', serverUrl)

const config = {
    APP_ID:                  required('APP_ID'),
    APPLICATION_NAME:        optional('APPLICATION_NAME', 'Parse Server'),
    CLOUD_CODE_MAIN:         optional('CLOUD_CODE_MAIN', './cloud/main.js'),
    DASHBOARD_PASSWORD:      required('DASHBOARD_PASSWORD'),
    DASHBOARD_SECRET:        optional('DASHBOARD_SECRET', 'asgoyqweotyhq3i4tuhger'),
    DASHBOARD_USERNAME:      required('DASHBOARD_USERNAME'),
    DATABASE_URI:            optional('DATABASE_URI', 'mongodb://localhost/parse-db'),
    JAVASCRIPT_KEY:          optional('JAVASCRIPT_KEY', 'D!q^dqI8ize5Lg$fJ0wW64e6tiZF28'),
    MASTER_KEY:              required('MASTER_KEY'),
    MOUNT_PATH:              mountPath,
    PARSE_LOG_VERBOSE:       optional('PARSE_LOG_VERBOSE', false),
    PARSE_SILENT:            optional('PARSE_SILENT', false),
    POOL_SIZE:               optional('POOL_SIZE', 5),
    PORT:                    port,
    PUBLIC_SERVER_URL:       publicServerUrl,
    PUSH:                    optional('PUSH', false),
    ROOT_URL:                rootUrl,
    SERVER_URL:              serverUrl,
    WORKERS:                 optional('WORKERS', 1),
}

export default config
