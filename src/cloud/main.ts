/* global Parse */
import './hooks/init'
import './functions/timesheet-functions'
import './functions/presence-functions'

Parse.Cloud.define(
  'hello',
  req => `Hi ${req.user ? req.user.getUsername() : 'Unknown'}`,
)
