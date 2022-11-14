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
      var patient = this.make("patients");
      patient.firstName = args.firstName;
      patient.lastName = args.lastName;
      patient.age = args.age;
      patient.gender = args.gender;
      patient.dob = args.dob;
      patient.email = args.email;
      patient.phoneNumber = args.phoneNumber;
      patient.Address = args.Address;

      patient.save$(function (err, patient) {
        done(err, patient.data$(false));
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
    patients.load$(args.patientID, function (err, patient) {
      console.log(patient);
      done(err, patient);
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
  //---------------------------------------add pattern for PATCH request(update Patient)
  seneca.add("role:patch,cmd:patient", (args, done) => {
    console.log("> PATCH req: Updating Patient request received");
    var patients = this.make("patients");
    var patientObj = {};
    console.log(args.patientID);
    if (args.firstName) {
      patientObj.firstName = args.firstName;
    }
    if (args.lastName) {
      patientObj.lastName = args.lastName;
    }
    if (args.age) {
      patientObj.age = args.age;
    }
    if (args.gender) {
      patientObj.gender = args.gender;
    }
    if (args.dob) {
      patientObj.dob = args.dob;
    }
    if (args.email) {
      patientObj.email = args.email;
    }
    if (args.phoneNumber) {
      patientObj.phoneNumber = args.phoneNumber;
    }
    if (args.Address) {
      patientObj.Address = args.Address;
    }

    patients.load$(args.patientID, function (err, patient) {
      console.log(patientObj);
      done(err, patient.data$(patientObj));
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
  //--------------------------------------act for PATCH request(updating patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "patch", cmd: "*" },
      map: {
        patient: { PATCH: true },
      },
    },
  });
  //--------------------------------------act for Post request(adding Patient Record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "post", cmd: "*" },
      map: {
        patientRecord: { POST: true },
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
