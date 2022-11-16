var plugin = function (option) {
  var seneca = this;
  //---------------------------------implementing API or adding pattern----------------------------

  //---------------------------------------adding pattern for Post request(adding Patient)
  seneca.add("role:post,cmd:patients", (args, done) => {
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
  seneca.add("role:getById,cmd:patients", (args, done) => {
    console.log("> GET req: Get Patient request received");
    var patients = this.make("patients");
    console.log(args.patientId);
    patients.load$(args.patientId, function (err, patient) {
      if (patient == null) {
        done(err, { error: "Patient not Found" });
      }
      done(err, patient);
    });
  });
  //---------------------------------------adding pattern for DELETE request(delete patient)
  seneca.add("role:delete,cmd:patients", (args, done) => {
    console.log("-->delete, item_id:" + args.item_id);
    var patients = this.make("patients");
    patients.remove$(args.patientId, function (err) {
      done(err, null);
    });
  });
  //---------------------------------------add pattern for PATCH request(update Patient)
  seneca.add("role:patch,cmd:patients", (args, done) => {
    console.log("> PATCH req: Updating Patient request received");
    var patients = this.make("patients");
    var patientObj = {};
    console.log(args.patientId);
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

    patients.load$(args.patientId, function (err, patient) {
      patient.data$(patientObj);
      patient.save$((err, patient) => {
        done(err, patient.data$(false));
      });
    });
  });
  //------------------------------------Adding parttern for POST Request[Add Patient Record]
  seneca.add("role:post,cmd:patientRecords", (args, done) => {
    console.log("POST Request: Add patient record request");
    if (args.type && args.value && args.dateTime && args.patientId) {
      var patients = this.make("patients");
      patients.load$(args.patientId, function (err, patient) {
        if (patient == null) {
          done(err, { error: "Patient not Found" });
        } else {
          var record = this.make("patientRecords");
          record.patientId = patient.id;
          record.type = args.type;
          record.value = args.value;
          record.dateTime = args.dateTime;
          record.save$((err, record) => {
            done(err, record.data$(false));
          });
        }
      });
    } else {
      done(null, { error: "Data missing" });
    }
  });
  //------------------------------------Adding pattern for GET request[Get all patient Records]
  seneca.add("role:get,cmd:patientRecords", (args, done) => {
    var records = this.make("patientRecords");
    records.list$({ patientId: args.patientId }, done);
  });
  //------------------------------------Adding pattern for GET request[Get patient Record with Id]
  seneca.add("role:getById,cmd:patientRecords", (args, done) => {
    var records = this.make("patientRecords");
    records.load$(args.recordId, (err, record) => {
      if (record == null) {
        done(err, { error: "Record not found with this id" });
      }
      done(err, record.data$(false));
    });
  });
  //------------------------------------Adding pattern for PATCH request[Updating patient Record]
  seneca.add("role:patch,cmd:patientRecords", (args, done) => {
    var records = this.make("patientRecords");
    var patientRecordObj = {};
    if (args.type) {
      patientRecordObj.type = args.type;
    }
    if (args.dateTime) {
      patientRecordObj.dateTime = args.dateTime;
    }
    if (args.value) {
      patientRecordObj.value = args.value;
    }
    records.load$(args.recordId, (err, record) => {
      if (record === null) {
        done(err, { error: "record Id not found" });
      }
      record.data$(patientRecordObj);
      record.save$((err, record) => {
        done(err, record.data$(false));
      });
    });
  });
  //------------------------------------Adding pattern for DELETE request[deleting patient Record]
  seneca.add("role:delete,cmd:patientRecords", (args, done) => {
    console.log("-->delete, item_id:" + args.recordId);
    var records = this.make("patientRecords");
    records.remove$(args.recordId, function (err) {
      done(err, null);
    });
  });
};
module.exports = plugin;
