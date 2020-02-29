/* global Parse */

export const lib = {
  defineClass: async (parseClass: any) => {
    // const newLocalSchema = new Parse.Schema(parseClass.className)

    Parse.Cloud.beforeFind(parseClass.className, parseClass.beforeFind)
    Parse.Cloud.beforeSave(parseClass.className, parseClass.beforeSave)
    // Parse.Cloud.afterSave(parseClass.className, lib.analytics)
    Parse.Cloud.afterSave(parseClass.className, parseClass.afterSave)
    Parse.Cloud.beforeDelete(parseClass.className, parseClass.beforeDelete)
    Parse.Cloud.afterDelete(parseClass.className, parseClass.afterDelete)
    // return newLocalSchema.save()
  },
  addAddons: async (parseClass: any) => {
    if (parseClass.addons && parseClass.addons.length) {
      parseClass.addons.forEach((addon: any) => {
        // parseClass.useAddon(addon)
        Parse.Cloud.beforeFind(parseClass.className, addon.beforeFind)
        Parse.Cloud.beforeSave(parseClass.className, addon.beforeSave)
        // Parse.Cloud.afterSave(parseClass.className, lib.analytics)
        Parse.Cloud.afterSave(parseClass.className, addon.afterSave)
        Parse.Cloud.beforeDelete(parseClass.className, addon.beforeDelete)
        Parse.Cloud.afterDelete(parseClass.className, addon.afterDelete)
      })
    }
  },
  defineUserClass: async (parseClass: any): Promise<void> => {
    // const newLocalSchema = new Parse.Schema(parseClass.className)

    Parse.Cloud.beforeFind(Parse.User, parseClass.beforeFind)
    Parse.Cloud.beforeSave(parseClass.className, parseClass.beforeSave)
    // Parse.Cloud.afterSave(parseClass.className, lib.analytics)
    Parse.Cloud.afterSave(Parse.User, parseClass.afterSave)
    Parse.Cloud.beforeDelete(parseClass.className, parseClass.beforeDelete)
    Parse.Cloud.afterDelete(parseClass.className, parseClass.afterDelete)
    // return newLocalSchema.save()
  },
  addAddonsUserClass: async (parseClass: any): Promise<void> => {
    if (parseClass.addons.length > 0) {
      parseClass.addons.forEach((addon: any) => {
        // parseClass.useAddon(addon)
        Parse.Cloud.beforeFind(Parse.User, addon.beforeFind)
        Parse.Cloud.beforeSave(Parse.User, addon.beforeSave)
        // Parse.Cloud.afterSave(parseClass.className, lib.analytics)
        Parse.Cloud.afterSave(Parse.User, addon.afterSave)
        Parse.Cloud.beforeDelete(Parse.User, addon.beforeDelete)
        Parse.Cloud.afterDelete(Parse.User, addon.afterDelete)
      })
    }
  },
}
export const buildHooks = async (parseClasses: Record<string, any>[]) => {
  await Promise.all(
    parseClasses.map(async parseClass => {
      if (parseClass.className !== '_User') {
        lib.defineClass(parseClass)
        lib.addAddons(parseClass)
      } else {
        console.log(parseClass.className)
        lib.defineUserClass(parseClass)
        // lib.addAddonsUserClass(parseClass)
      }
    }),
  )
}
