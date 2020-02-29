export const Analytic = {
  className: 'Analytic',
  fields: {
    objectId: { type: 'String' },
    createdAt: {
      type: 'Date',
    },
    updatedAt: {
      type: 'Date',
    },
    ACL: { type: 'ACL' },
    event: { type: 'String', required: true },
    classType: { type: 'String', required: true },
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
      '*': ['event', 'objectReference', 'classType'],
    },
  },
}
