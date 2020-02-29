/* global Parse */
const QueryCreator = {
	createQuery: (className: string) => {
		const ClassName = Parse.Object.extend(className)
		return new Parse.Query(ClassName)
	},
}

export default QueryCreator
