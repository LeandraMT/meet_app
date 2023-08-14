/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
import mockData from './mock-data';

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];

    return locations;
};

//Defining the vars for checking token's validity
const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

//Defining the function for any other text to be removed after the URL
const removeQuery = () => {
    let newUrl;
    if (window.history.pushState && window.location.pathname) {
        newUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.locatio.pathname;
        window.history.pushState("", "", newUrl);
    }
    else {
        newUrl =
            window.location.protocol +
            "//" +
            window.location.host;
        window.history.pushState("", "", newUrl);
    }
};

//Defining function for when users login they'll be redirected from Google to my app
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch("https://uvvrz2x0c5.execute-api.eu-central-1.amazonaws.com/dev/api/token" + "/" + encodeCode);

    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
}

export const getEvents = async () => {
    if (window.location.href.startsWith('http://localhost')) {
        return mockData;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = "https://uvvrz2x0c5.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            return result.events;
        }
        else {
            return null;
        }
    };
};

//Getting the access token
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");

        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch(
                "YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT"
            );

            const result = await response.json();

            const { getAuthURL } = result;
            return (window.location.href = getAuthURL); //"https://uvvrz2x0c5.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
        }
        return code && getToken(code);
    }
    return accessToken;
}