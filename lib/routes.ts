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
			// buyCredits: (id: string) => `/dashboard/credits/buy-credits/${id}`,
		},
		sms: {
			index: "/dashboard/sms",
			send: "/dashboard/sms/send-sms",
			viewSms: (id: string) => `/dashboard/sms/${id}`,
		},
	},
};
