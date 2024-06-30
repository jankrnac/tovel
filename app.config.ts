// app.config.ts
export default defineAppConfig({
    appName: "Tashky",
    dataSource: 'medusa', 		//[api, content]
    maxWidth: '1900px',
    nuxtIcon: {
      	size: '24px', 			// default <Icon> size applied
    },
    ui: {
      	primary: 'gray',
      	gray: 'cool'
    }
})