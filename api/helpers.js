// require("dotenv").config();
const axios = require("axios");

async function apiCallPost(reqBody, url) {
    let response;

    try {
        response = await axios.post(process.env.API_BASE_URL + url, reqBody, {
            withCredentials: true,
            credientials: "include",
            headers: {
                apikey: process.env.API_KEY,
            },
        });

        console.log("try apiCallPost ", reqBody);
    } catch (err) {
        // Handle Error Here
        response = err.response;
        console.log("catch apiCallPost ", reqBody);
    }
    return response;
}

async function apiCallGet(url) {
    let response;

    try {
        response = await axios.get(process.env.API_BASE_URL + url, {
            withCredentials: true,
            credientials: "include",
            headers: {
                apikey: process.env.API_KEY,
            },
        });

        console.log("try apiCallGet ");
    } catch (err) {
        // Handle Error Here
        response = err.response;
        console.log("catch apiCallGet");
    }
    return response;
}

async function apiCallDelete(url) {
    let response;

    try {
        response = await axios.delete(process.env.API_BASE_URL + url, {
            withCredentials: true,
            headers: {
                apikey: process.env.API_KEY,
            },
        });

        console.log("try apiCallDelete");
    } catch (err) {
        // Handle Error Here
        response = err.response;
        console.log("catch apiCallDelete");
    }
    return response;
}

async function apiCallPut(reqBody, url) {
    console.log('Hello from api > helpers ')
    let response;

    try {
        response = await axios.put(process.env.API_BASE_URL + url, reqBody, {
            withCredentials: true,
            headers: {
                apikey: process.env.API_KEY,
            },
        });

        console.log("try apiCallPut", reqBody);
    } catch (err) {
        // Handle Error Here
        response = err.response;
        console.log("catch apiCallPut", reqBody);
    }
    return response;
}

module.exports = {apiCallPost, apiCallGet, apiCallDelete, apiCallPut};
