export default defineNuxtConfig({
	devtools: {
		enabled: true
	},

	devServer: {
		port: 3000
	},

	runtimeConfig: {
		public: {
			apiBase: ''
		}
	},

	future: {
		compatibilityVersion: 4,
	},

	modules: [
		'@nuxt/content',
		'@nuxt/image',
		'@nuxtjs/google-fonts',
		'@nuxt/ui',
		'@nuxthq/studio'
	],

	supabase: {
		cookieOptions: {
			secure: process.env.NODE_ENV === 'production',
		},
		redirect: false
	},

	googleFonts: {
		families: {
			'Bagel Fat One': true,
		}
	},

	content: {
		experimental: {
			search: true
		}
	},

	ui: {
		icons: ['ph']
	},

	compatibilityDate: '2024-07-16'
})