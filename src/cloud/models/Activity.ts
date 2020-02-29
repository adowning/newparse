export const Activity = {
  className: 'Activity',
  fields: {
    objectId: { type: 'String' },
    createdAt: {
      type: 'Date',
    },
    updatedAt: {
      type: 'Date',
    },
    ACL: { type: 'ACL' },
    notifyRoles: { type: 'Array', defaultValue: ['admin'] },
    classType: { type: 'String', required: true },
    status: { type: 'Number', defaultValue: 0 },
    objectReference: { type: 'String', required: true },
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
      '*': ['notifyRoles', 'classType', 'status', 'objectReference'],
    },
  },
}
