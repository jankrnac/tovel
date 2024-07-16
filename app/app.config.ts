// app.config.ts
export default defineAppConfig({
    appName: "JK Eshop",
    dataSource: 'medusa', 		//[api, content]
    maxWidth: '1900px',
    nuxtIcon: {
      	size: '24px', 			// default <Icon> size applied
    },
    ui: {
        primary: 'blue',
    }
})