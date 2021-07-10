const express = require('express')
const promise = require('bluebird')
const shiprocket = require('./api/shiprocket')
const pickrr = require('./api/pickrr')
const PORT = process.env.PORT || 5000 

express()
  .get('/',(request,response)=>{
    response.status(200).json({
      build:1,
      value:500,
      shipping:50
    })
  })
  .get('/:trackid', (request, response)=>{
    const trackid = request.params.trackid;
    promise.all([shiprocket(trackid),pickrr(trackid)])
    .spread((ship,pick)=>{
        response.status(200).json(ship==null?pick:ship)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
