const axios = require("axios");
var cookies = require("cookie-parser");

module.exports = async function refreshRequest(req, res){

    console.log("refresh route used")

    const response = await axios.get(process.env.API_URL + "/refresh",
        {
            withCredentials: true,
            headers: { 'cookiejwt': req.cookies.jwt }
            })
    try {
        return res.status(response.status).json(response.data)
    }catch(err)  {
        console.log(err);
        return res.status(401).json(err)
    }

}