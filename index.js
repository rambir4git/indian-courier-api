const express = require('express')
const promise = require('bluebird')
const shiprocket = require('./api/shiprocket')
const pickrr = require('./api/pickrr')
const PORT = process.env.PORT || 5000 

express()
  .get('/:trackid', (request, response)=>{
    const trackid = request.params.trackid;
    promise.join(shiprocket(trackid),pickrr(trackid))
    .spread((ship,pick)=>{
        response.status(200).json(ship==null?pick:ship)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
