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
      add: "/dashboard/credits/add-bot",
      update: (id: string) => `/dashboard/credits/update-bot/${id}`,
      buyCredits: (id: string) => `/dashboard/credits/buy-credit/${id}`,
    },
    sms: {
      index: "/dashboard/sms",
      send: "/dashboard/sms/send-sms",
      viewSms: (id: string) => `/dashboard/sms/${id}`,
      updateSms: (id: string) => `/dashboard/sms/update-sms/${id}`,
    },
    profile: "/dashboard/profile",
    account: {
      index: "/dashboard/accounts",
      update: (id: string) => `/dashboard/accounts/update-account/${id}`,
      add: "/dashboard/accounts/add-account",
      view: (id: string) => `/dashboard/accounts/${id}`,
    },
    strategy: {
      index: "/dashboard/strategies",
      update: (id: string) => `/dashboard/strategies/update-strategy/${id}`,
      add: "/dashboard/strategies/add-strategy",
      config: (id: string) => `/dashboard/strategies/config-strategy/${id}`,
    },
    proxy: {
      index: "/dashboard/proxies",
      update: (id: string) => `/dashboard/proxies/update-proxy/${id}`,
      add: "/dashboard/proxies/add-proxy",
    },
  },
};
