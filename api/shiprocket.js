const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data')
const tabletojson = require('tabletojson').Tabletojson;

let trackurl = 'https://packaging.shiprocket.in/index.php?route=account/track';

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    var bodyFormData = new FormData();
    bodyFormData.append('awbcode', trackingId);
    return axios({
    method: 'post',
    url: trackurl,
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
        console.log(response)
        return response
        //tablesAsJson = tabletojson.convert(response.data);
        

    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
})

module.exports = router;
