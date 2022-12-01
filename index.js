var seneca = require("seneca")();
seneca.use("mongo-store", {
  name: "clinicData",
  host: "127.0.0.1",
  port: "27017",
});
seneca.use("entity");

seneca.ready(() => {
  seneca.use("APIsPatterns");
  seneca.use("patientsActs");
  //---------------------------------configuration of express framework
  var express = require("express");
  var app = express();

  // -------------------------------------to parser request
  app.use(require("body-parser").json());

  app.use(seneca.export("web"));

  // ------------------------------------Define listening port
  app.listen(3009);

  //--------------------------------------Server Details
  console.log("*-------------Instructions----------------------*");
  console.log("Server listening at http://127.0.0.1:3009");
  console.log("-------------Requests(M2)----------------------");
  console.log("http://127.0.0.1:3009/patients [POST request to add patient]");
  console.log(
    "http://127.0.0.1:3009/patients [GET request to fetch all patients]"
  );
  console.log(
    "http://127.0.0.1:3009/patients/<patientId> [DELETE request to delete patient]"
  );
  console.log(
    "http://127.0.0.1:3009/patients/<patientId> [GET request to Patient by id]"
  );
  console.log("-------------Requests(M3)----------------------");
  console.log(
    "http://127.0.0.1:3009/patients/<patientId> [Patch request to update Patient data by id]"
  );

  console.log(
    "http://127.0.0.1:3009/patientRecords [POST request to add patientrecord]"
  );
  console.log(
    "http://127.0.0.1:3009/patientRecords?patientId=<patientId> [GET request to fetch all records of patient]"
  );
  console.log(
    "http://127.0.0.1:3009/patientRecords/<recordId> [GET request to view any record of patient]"
  );
  console.log(
    "http://127.0.0.1:3009/patientRecords/<recordId> [Patch request to update any record of patient]"
  );
  console.log(
    "http://127.0.0.1:3009/patientRecords/<recordId> [Delete request to delete any record of patient]"
  );
});
