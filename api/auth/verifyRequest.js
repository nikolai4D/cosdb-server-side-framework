const axios = require("axios");

module.exports = async function verifyRequest(req, res){

    console.log("verify route used")

    let response

    try {
        response = await axios.get(process.env.API_BASE_URL + "/verify",
        //req.body,
        {withCredentials: true,
            headers: {'authorization': req.headers.authorization},
        })

        return res.status(response.status).json(response.data)

        }catch(err)  { console.log(err);
        return res.status(401).json(err) }

}