var seneca = require("seneca")();
seneca.use("mongo-store", {
  name: "clinicData",
  host: "127.0.0.1",
  port: "27017",
});
seneca.use("entity");

seneca.ready(() => {
  seneca.use("patientsDataManager");
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
  console.log("-------------Requests----------------------");
  console.log("http://127.0.0.1:3009/patient [POST request to add patient]");
  console.log(
    "http://127.0.0.1:3009/patients [GET request to fetch all patients]"
  );
  console.log(
    "http://127.0.0.1:3009/patient?patientId=<patientId> [DELETE request to delete patient]"
  );
  console.log(
    "http://127.0.0.1:3009/patient?patientId=<patientId> [GET request to Patient by id]"
  );
});
