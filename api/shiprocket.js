const express = require('express');
const router = express.Router();
const axios = require('axios');
const tabletojson = require('tabletojson').Tabletojson;

let url = 'https://packaging.shiprocket.in/index.php?route=account/track';

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    return axios.post(url,{awbcode:trackingId})
    .then(response => {
        tablesAsJson = tabletojson.convert(response.data);
        console.log(tableAsJson)
        if (!tablesAsJson || !tablesAsJson.length){
                return res.json({ result: `Invalid Tracking Id ${trackingId}` })
            } 
        else {
                let modified = tablesAsJson[1].reduce((acc, current) => [...acc, { location: current.Place, detail: current.Status, date: `${current.Date} ${current.Time}` }], [])
                return res.json({ result: modified })
            }
    })
})

module.exports = router;
