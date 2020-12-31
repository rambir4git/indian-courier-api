const express = require('express');
const router = express.Router();
const axios = require('axios');
const tabletojson = require('tabletojson').Tabletojson;

let url = 'https://packaging.shiprocket.in/index.php?route=account/track';

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    return axios.post(url,{awbcode:trackingId})
    .then(response => {
        //tablesAsJson = tabletojson.convert(response.data);
        console.log(response)
        return res.json({status: "bohot sahi"})

    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
})

module.exports = router;
