var plugin = function (option) {
  var seneca = this;

  //---------------------------------implementing API or adding pattern----------------------------

  //---------------------------------------adding pattern for Post request(adding Patient)
  seneca.add("role:post,cmd:patient", (args, done) => {
    console.log("> POST req: Add Patient request received");
    console.log("-->add, item_name:" + args.firstName);
    if (
      args.firstName &&
      args.lastName &&
      args.age &&
      args.gender &&
      args.dob &&
      args.email &&
      args.phoneNumber &&
      args.Address
    ) {
      var patients = this.make("patients");
      patients.firstName = args.firstName;
      patients.lastName = args.lastName;
      patients.age = args.age;
      patients.gender = args.gender;
      patients.dob = args.dob;
      patients.email = args.email;
      patients.phoneNumber = args.phoneNumber;
      patients.Address = args.Address;

      patients.save$(function (err, product) {
        done(err, patients.data$(false));
      });
    } else {
      done(null, { error: "Data missing" });
    }
  });
  //---------------------------------------adding pattern for GET request(getting All patient)
  seneca.add("role:get,cmd:patients", (args, done) => {
    console.log("> GET req: Get all Patients request received");
    var patients = this.make("patients");
    patients.list$({}, done);
  });
  //---------------------------------------adding pattern for GET request(View patient with id)
  seneca.add("role:get,cmd:patient", (args, done) => {
    console.log("> GET req: Get Patient request received");
    var patients = this.make("patients");
    console.log(args.patientId);
    patients.list$({}, (err, res) => {
      var found = false;
      res.forEach((element) => {
        console.log(element.id);
        if (element.id == args.patientId) {
          found = true;
          found = element;
        }
      });
      if (found) {
        done(null, { patient: found });
      } else {
        done(null, { er: "not Found" });
      }
    });
  });
  //---------------------------------------adding pattern for DELETE request(delete patient)
  seneca.add("role:delete,cmd:patient", (args, done) => {
    console.log("-->delete, item_id:" + args.item_id);
    var patients = this.make("patients");
    patients.remove$(args.patientId, function (err) {
      done(err, null);
    });
  });

  // //--------------------------------API act's or adding Api's to server----------------------------------

  //--------------------------------------act for Post request(adding Patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "post", cmd: "*" },
      map: {
        patient: { POST: true },
      },
    },
  });

  //--------------------------------------act for GET request(getting All patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "get", cmd: "*" },
      map: {
        patients: { GET: true },
      },
    },
  });
  //--------------------------------------act for Post request(adding Patient Record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "post", cmd: "*" },
      map: {
        patient: { POST: true },
      },
    },
  });

  //--------------------------------------act for GET request(getting All patient record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "get", cmd: "*" },
      map: {
        patients: { GET: true },
      },
    },
  });

  //--------------------------------------act for GET request(View patient with id)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "get", cmd: "*" },
      map: {
        patient: { GET: true },
      },
    },
  });

  //--------------------------------------act for DELETE request(delete patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "delete", cmd: "*" },
      map: {
        patient: { DELETE: true },
      },
    },
  });
};
module.exports = plugin;

// seneca.act("role:web", {
//   use: {
//     prefix: "/patient",
//     pin: { area: "patient", action: "*" },
//     map: {
//       addPatient: { POST: true },
//       listAllPatients: { GET: true, suffix: "s" },
//       viewPatient: { GET: true, suffix: "?patientId=:id" },
//       updatePatient: { PATCH: true },
//       // deletePatient: { DELETE: true, suffix: "?patientId=:id" },
//       // addPatientRecord: { POST: true, suffix: "Record?patientId=:id" },
//       // viewPatientRecords: { GET: true, suffix: "Records?patientId=:id" },
//       // updatePatientRecord: { PATCH: true, suffix: "Record?recordId=:id" },
//       // deletePatientRecord: { DELETE: true, suffix: "Record?recordId=:id" },
//     },
//   },
// });

// //---------------------------------implementing API or adding pattern----------------------------

// seneca.add({ area: "product", action: "add" }, function (args, done) {
//   console.log("-->add, item_name:" + args.firstName);

//   var patient = this.make("patients");
//   patient.firstName = args.firstName;

//   // products.save$(function(err, product) {
//   //     done(err, products.data$(false));
//   // });
//   done("doen");
// });
