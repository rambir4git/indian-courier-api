const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const ecom = require('./api/ecomexpress.js');
const ekart = require('./api/ekart.js');
const delhivery = require('./api/delhivery.js');
const xpressbees = require('./api/xpressbees.js');
const bluedart = require('./api/bluedart.js');
const gati = require('./api/gati.js');
const dtdc = require('./api/dtdc.js');
const shadowfax = require('./api/shadowfax.js');
const dhl = require('./api/dhl.js');
const shiprocket = require('./api/shiprocket.js');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/ecom', ecom)
app.use('/ekart', ekart)
app.use('/delhivery', delhivery)
app.use('/xpressbees', xpressbees)
app.use('/bluedart', bluedart)
app.use('/gati', gati)
app.use('/dtdc', dtdc)
app.use('/shadowfax', shadowfax)
app.use('/dhl', dhl)
app.use('/shiprocket', shiprocket)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app
