export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID as string,
        authority: `https://login.microsoftonline.com/common`,
        redirectUri: 'http://localhost:3000/',
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
};

export const mslLoginRequest = {
    scopes: ["User.Read"],
};