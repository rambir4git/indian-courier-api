const express = require('express');
const router = express.Router();
const tabletojson = require('tabletojson');

let url = 'https://www.xpressbees.com/track?isawb=Yes&trackid=';

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    console.log(url+trackingId)
    tabletojson.convertUrl(url + trackingId)
    .then(tablesAsJson => {
        console.log(tablesAsJson.length)
        return (!tablesAsJson || !tablesAsJson.length || tablesAsJson.length == 1) ? res.json({ result: `Invalid Tracking Id ${trackingId}` }) : res.json({ result: tablesAsJson[2] })
    })
})

module.exports = router;