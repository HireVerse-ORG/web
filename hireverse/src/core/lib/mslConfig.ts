export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID as string,
        authority: `https://login.microsoftonline.com/common`,
        redirectUri: import.meta.env.VITE_APP_URL as string,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
};

export const mslLoginRequest = {
    scopes: ["openid", "profile", "email"],
};