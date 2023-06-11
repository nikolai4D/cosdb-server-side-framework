const axios = require("axios");

module.exports = async function logoutRequest(req, res){

    console.log("logout route used")

    const response = await axios.get(process.env.API_URL + "/logout")
    res.status(response.status)

}