const chai = require('chai');
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
const chaiaspromised = require('chai-as-promised');
chai.use(chaiaspromised);
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


const server = require('../index');
const { response } = require('express');


describe('Class APIs', function () {
  // checking that get request for getting all food items is working properly
  it('getAllClassApis', function (done) {
    this.timeout(0);
    chai
      .request(server)
      .get('/class/getAllClasses')
      //.set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Create a new Class', function () {
    chai
      .request(server)
      .post('/class/getAllClasses')
      .send({
        "title": "twotjgujghirty",
        "description": "created at 2:30 am ",
        "archived": true,
        "teacher": [
          "61db24a8a8023735e075a542"
        ],
        "students": [
          "61db24d6a8023735e075a543",
          "61dd017365621337685fcc1a"
        ],
        "owner": "61db24a8a8023735e075a542",
        "code": "strikbjbng123"
      })

  });



  it('get a particular class by its ID', function (done) {
    chai
      .request(server)
      .get('/class/61db23d8a8023735e075a53d') // sending the reqeust for a particular food item
      .end((err, res) => {
        let data = res.body;
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(data).to.have.all.keys(
          // checking for all properties that should be send in response
          "archived",
          "teacher",
          "students",
          "_id",
          "title",
          "description",
          "owner",
          "code",
          "createdAt",
          "updatedAt",
          "__v"
        );

        done();
      });
  });


  it('Update Class by its ID', function (done) {
    this.timeout(0);
    chai
      .request(server)
      .patch('/class/61db23d8a8023735e075a53d')
      .send({

        "teacher": [
          "61db24a8a8023735e075a542"
        ],
        "students": [
          "61db24d6a8023735e075a543",
          "61dd017365621337685fcc1a"
        ],
        "title": "updated",
        "description": "created at 2:30 am and its submission time",
        "owner": "61db24a8a8023735e075a542",
        "code": "string123"

      })
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch(function (err) {
        console.log(err);
      });
    done();
  });




});




// --------------------------------------------------------------------------------------------------------------



describe('User APIs', function () {
  // checking that get request for getting all food items is working properly
  it('getAllUsersApis', function (done) {
    this.timeout(0);
    chai
      .request(server)
      .get('/users/getAllUsers/')
      //.set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })

  it('get a particular user by its ID', function (done) {
    chai
      .request(server)
      .get('/users/62686db78e6b7130dcd95082') // sending the reqeust for a particular user item
      .end((err, res) => {
        let data = res.body;
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(data).to.have.all.keys(
          // checking for all properties that should be send in response
          "archived_class",
          "_id",
          "username",
          "password",
          "email",
          "token",
          "createdAt",
          "updatedAt",
          "__v"
        );

        done();
      });
  });

  it('Create a new User', function () {
    chai
      .request(server)
      .post('/users/getAllUsers')
      .send({

        "username": "user1575",
        "password": "dishan5tchaman",
        "email": "user1755@gmail.com",
        "token": "dishan5ttayade"

      })

  });



  it('Update User', function (done) {
    this.timeout(0);
    chai
      .request(server)
      .patch('/users/62686db78e6b7130dcd95082')
      .send({

        "username": "string1",
        "password": "anewone",
        "email": "string1",
        "token": "string1"


      })
    
    done();
  });




});


// -----------------------------------------------------------------------------------------------------------------



describe('ClassWork APIs', function () {
  // checking that get request for getting all food items is working properly
  it('getAllClassWorkApis', function (done) {
    this.timeout(0);
    chai
      .request(server)
      .get('/classwork/getAllClassworks/')
      //.set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })

  it('get a particular classwork by its ID', function (done) {
    chai
      .request(server)
      .get('/classwork/626599e7da808b0020cdb74b') // sending the reqeust for a particular food item
      .end((err, res) => {
        let data = res.body;
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(data).to.have.all.keys(
          // checking for all properties that should be send in response
          "answer",
          "options",
          "_id",
          "title",
          "description",
          "class",
          "author",
          "types",
          "createdAt",
          "updatedAt",
          "__v"
        );

        done();
      });
  });

  it('Create a new ClassWork', function () {
    chai
      .request(server)
      .post('classwork/getAllClassworks/')
      .send({
        "answer": [],
        "options": [
          "5",
          "10",
          "50",
          "45"
        ],

        "title": "MCQ 1",
        "description": "How many students in this class?",
        "class": "61d991f14ba7465304ccc5ae",
        "types": "multiple choice",
        "duedate": null,
        "author": "61d9919c4ba7465304ccc5ad"
      })

  });



  it('Update ClassWork', function (done) {
    this.timeout(0);
    chai
      .request(server)
      .patch('/classwork/626599e7da808b0020cdb74b')
      .send({

        "answer": [],
        "options": [],
        "_id": "62686745d452d11ed0b27266",
        "title": "MCQ 112",
        "description": "dishant ne update kiya  , ab hardik ne ",
        "class": "61d991f14ba7465304ccc5ae",
        "author": "61d9919c4ba7465304ccc5ad",
        "types": "multiple choice",
        "createdAt": "2022-04-04T12:18:37.360Z",
        "updatedAt": "2022-04-04T16:53:34.508Z",
        "__v": 0

      })
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch(function (err) {
        console.log(err);
      });
    done();
  });

  

});