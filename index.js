var moment = require('moment');

const mqtt = require('mqtt')
const fs = require('fs')
const path = require('path')
const CERT = fs.readFileSync(path.join(__dirname, '/server.pem'))


const url = 'mqtts://f2bed6f24e6244468bf22c01d7e50881.s2.eu.hivemq.cloud';
const PORT = 8883;

const options = {
  port: PORT,
  cert: CERT,
  username: 'omorsh',
  password: 'Omor2402',
  rejectUnauthorized: true,
  protocol: 'mqtts'
}
const client = mqtt.connect(url, options) 

client.on('connect', function () {
    console.log('connected to broker successfully')
})

client.subscribe('randomValue')
client.on('message', function (topic, message) {
  const payload = {
    when: moment().format("h:mm:ss a"),
    data : parseInt(message.toString()) 
  }
 console.log(payload)
})