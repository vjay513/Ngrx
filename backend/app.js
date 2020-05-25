const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const customersInfo = [
  {
      "name":"vijay",
      "phone":"87675",
      "address":"1234 Hyderabad",
      "membership":"plaitnum",
      "id": 1
    },
    {
      "name":"Krishna",
      "phone":"876455",
      "address":"1234 Palsa",
      "membership":"VIP",
      "id": 2
    }
];


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header","Origin, X-Request-with, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.options('*', cors());

app.get('/customers',(req, res, next) => {
  res.status(200).send(customersInfo);
});

app.post("/customer",(req, res, next)=> {
  const customer = req.body;
  customersInfo.push(customer);
  res.status(200).send(req.body);
 });

 app.patch("/customer/:id",(req, res, next)=> {
  customersInfo.forEach((val, key)=> {
    if(val.id == req.params.id){
      customersInfo[key] = req.body;
    }
  });
  res.status(200).send(req.body);
 });

 app.delete("/customer/:id",(req, res, next)=> {
  customersInfo.forEach((val, key)=> {
    if(val.id == req.params.id){
      customersInfo.splice(key, 1)
    }
  });
  res.status(200).send(req.params.id);
 });

module.exports = app;
