var plugin = function (option) {
  var seneca = this;

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
        patientRecords: { GET: true },
      },
    },
  });
  //--------------------------------------act for GET request(getting patient record with Id)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "get", cmd: "*" },
      map: {
        patientRecord: { GET: true },
      },
    },
  });

  //--------------------------------------act for PATCH request(updating patient record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "patch", cmd: "*" },
      map: {
        patientRecord: { PATCH: true },
      },
    },
  });
  //--------------------------------------act for PATCH request(updating patient record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "delete", cmd: "*" },
      map: {
        patientRecord: { DELETE: true },
      },
    },
  });
};
module.exports = plugin;
