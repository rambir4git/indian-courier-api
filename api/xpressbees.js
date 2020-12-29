const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    return axios.get(`http://www.xpressbees.com/track?isawb=Yes&trackid=${trackingId}`)
    .then(response => {
        console.log(response);
        if(!response.data.data[0].scans){
            return res.json({ result: `Invalid Tracking No. ${trackingId}` })
        }
        let final = response.data.data[0].scans.reduce((acc, current) => [...acc, { location: current.scannedLocation, detail: current.instructions, date: `${current.scanDateTime}` }],[]);
        return (!response.data.data[0].destination) ? res.json({ result: `Invalid Tracking No. ${trackingId}` }) : res.json({ result: final })
    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
})

module.exports = router;