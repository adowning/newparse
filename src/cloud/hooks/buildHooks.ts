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
		// const newLocalSchema = new Parse.Schema(parseClass.className)
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
}
export const buildHooks = async (parseClasses: Record<string, any>[]) => {
	// const allCloudSchema = (await Parse.Schema.all()).filter(
	// 	(s: any) => !lib.isDefaultSchema(s.className),
	// )
	await Promise.all(
		parseClasses.map(async (parseClass) => {
			console.log('creating hooks for ', parseClass.className)
			lib.defineClass(parseClass)
			lib.addAddons(parseClass)
			// lib.defineClass(localSchema)
		}),
	)
}