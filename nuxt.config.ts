export default defineNuxtConfig({

  	devtools: { 
		enabled: true 
	},

	devServer: {
		port: 3000
	},

	runtimeConfig: {
		public:{
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
        "@nuxt/ui"
    ],

    supabase: {
		cookieOptions: {
		  	secure: process.env.NODE_ENV === 'production',
		},
		redirect: false
	},

	googleFonts: {
		families: {
			Pacifico: true,
		}
	},

	content: {
		experimental: {
			search: true
		}
	}

})