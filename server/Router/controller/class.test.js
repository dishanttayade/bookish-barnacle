const classModel = require('../Class/class.router');
const classController = require('../controller/classController');

import fetch from "node-fetch";

// const http = require('http')
// const url = `http://localhost:5000/getAllClasses/`;
// const check = http.get(url, res => {
//   let data = '';
//   res.on('data', chunk => {
//     data += chunk;
//   });
//   res.on('end', () => {
//     data = JSON.parse(data);
//     console.log(data);
//   })
// }).on('error', err => {
//   console.log(err.message);
// })


const check = fetch(`http://localhost:${process.env.PORT}/getAllClasses/`,{
    method: 'GET'
});

console.log(check);