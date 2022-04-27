// requiring depedencies.
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
//const logger= require('morgan');
const morgan = require('morgan');
const fsr = require('file-stream-rotator');
const fs = require('fs');
// const moment = require('moment-timezone')

//load the environment variable
require('dotenv').config();

//Create server for socket.io
const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
	res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.header("Access-Control-Allow-Credentials", true)
	next();
})

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/public/")));



morgan.token('host', function (req, res) {
    return req.hostname
})

// app.use(morgan('combined'))
// let logsinfo = fsr.getStream({ filename: "./logfiles/classroomlog-%DATE%.log", frequency: "60m", verbose: true, date_format: "YYYY-MM-DD" });
// app.use(morgan({ stream: logsinfo }))
// app.use(morgan('method:: :method \t url:: :url \t host:: :host \tstatus:: :status \t content-length:: :res[content-length] \tresponse-time:: :response-time ms', { stream: logsinfo }));


//including routers
const userRouter = require('./Router/User/user.router');
const classRouter = require('./Router/Class/class.router');
const classworkRouter = require('./Router/Class/classwork.router');
app.use('/users', userRouter)
app.use('/class', classRouter)
app.use('/classwork', classworkRouter)

app.get('/',(req,res)=>{res.send('Hello from cloud')});

//listening to the port
const PORT = process.env.PORT || 5000;
module.exports=server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));
console.log(`http://localhost:${PORT}/`);

//connect to mongodb database
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.hikpg.mongodb.net/classroom?retryWrites=true&w=majorit`;
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//morgan
// logger.token('id',function(req,res)=>{
//     return req.id;
// })

// app.use(assignId);
// function assignId(req,res,next){
//     req.id=uuid();
//     next();
// }

// app.use(logger('0 -:id'));
// {
//     stream: accessLogStream
//     skip: function(req,res){return res.statusCode === 404}
// }
// ));


// Swagger
const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// //404 error handler
// app.use(function (req, res, next) {
// 	res.status(404).sendFile(__dirname + "/error/404.html")
// })


app.get("/api/welcome", (req,res) => {
    res.status(200).send({message: "Welcome to the MEN-REST-API"});
  }); 