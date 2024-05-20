export default defineNuxtConfig({

  	devtools: { 
		enabled: true 
	},

	modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
        'nuxt-icon',
        '@nuxt/image',
        "@nuxtjs/supabase",
		'@nuxtjs/google-fonts'
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
	}

})