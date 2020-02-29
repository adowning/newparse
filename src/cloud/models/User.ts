export const User = {
  className: '_User',
  fields: {
    objectId: { type: 'String' },
    createdAt: {
      type: 'Date',
    },
    updatedAt: {
      type: 'Date',
    },
    ACL: { type: 'ACL' },
    email: { type: 'String', required: true },
    active: { type: 'Boolean', defaultValue: true },
    authData: { type: 'Object' },
    emailVerified: { type: 'Boolean' },
    password: { type: 'String' },
    assetsId: { type: 'Number' },
    username: { type: 'String' },
    status: { type: 'Number', default: 1 },
    inCompliance: { type: 'Boolean', default: true },
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    avatar: { type: 'File' },
    externalApis: {
      type: 'Array',
    },
    default: [{ snipeIt: 'auto-gen' }],

    lastClockTimestamp: { type: 'Number', defaultValue: new Date().valueOf() },
    // lastClockTime: { type: 'Date', defaultValue: new Date() },
    isClocked: { type: 'Boolean', defaultValue: false },
    // lastClockEvent: new Date().valueOf(),
    lastLocationTimestamp: {
      type: 'Number',
      defaultValue: new Date().valueOf(),
    },
    deskPhone: { type: 'String', defaultValue: '19035663081' },
    officePhoneInfo: { type: 'Object' },
    lastLocation: {
      type: 'GeoPoint',
      defaultValue: {
        __type: 'GeoPoint',
        latitude: 32.31121,
        longitude: -95.263391,
      },
    },
  },
  indexes: { objectId: { objectId: 1 } },
  classLevelPermissions: {
    find: { '*': true },
    count: {},
    get: { '*': true },
    update: { requiresAuthentication: true },
    create: { '*': true },
    delete: { requiresAuthentication: true },
    addField: {},
    protectedFields: {
      '*': [
        'email',
        'authData',
        'emailVerified',
        'password',
        'username',
        'lastName',
        'firstName',
      ],
    },
  },
}
