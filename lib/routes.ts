export const routes = {
	index: "/",

	auth: {
		login: "/login",
		register: "/register",
		confirmEmail: "/register/confirm-email",
		forgotPassword: "/login/forgot-password",
		reserPassword: "/login/reset-password",
	},

	dashboard: {
		home: "/dashboard/home",
		credits: {
			index: "/dashboard/credits",
			add: "/dashboard/credits/add-account",
			update: (id: string) => `/dashboard/credits/update-account/${id}`,
			buyCredits: (id: string) => `/dashboard/credits/buy-credit/${id}`,
		},
		sms: {
			index: "/dashboard/sms",
			send: "/dashboard/sms/send-sms",
			viewSms: (id: string) => `/dashboard/sms/${id}`,
			updateSms: (id: string) => `/dashboard/sms/update-sms/${id}`,
		},
		profile: "/dashboard/profile",
	},
};
