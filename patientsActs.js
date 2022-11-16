var plugin = function (option) {
  var seneca = this;

  // //--------------------------------API act's or adding Api's to server----------------------------------

  //--------------------------------------act for Post request(adding Patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "post", cmd: "*" },
      map: {
        patients: { POST: true },
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
      pin: { role: "getById", cmd: "*" },
      map: {
        patients: { GET: true, suffix: "/:patientId" },
      },
    },
  });

  //--------------------------------------act for DELETE request(delete patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "delete", cmd: "*" },
      map: {
        patients: { DELETE: true, suffix: "/:patientId" },
      },
    },
  });
  //--------------------------------------act for PATCH request(updating patient)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "patch", cmd: "*" },
      map: {
        patients: { PATCH: true, suffix: "/:patientId" },
      },
    },
  });
  //--------------------------------------act for Post request(adding Patient Record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "post", cmd: "*" },
      map: {
        patientRecords: { POST: true },
      },
    },
  });

  //--------------------------------------act for GET request(getting patient's All records)
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
      pin: { role: "getById", cmd: "*" },
      map: {
        patientRecords: { GET: true, suffix: "/:recordId" },
      },
    },
  });

  //--------------------------------------act for PATCH request(updating patient record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "patch", cmd: "*" },
      map: {
        patientRecords: { PATCH: true, suffix: "/:recordId" },
      },
    },
  });
  //--------------------------------------act for DELETE request(deleting patient record)
  seneca.act("role:web", {
    use: {
      prefix: "",
      pin: { role: "delete", cmd: "*" },
      map: {
        patientRecords: { DELETE: true, suffix: "/:recordId" },
      },
    },
  });
};
module.exports = plugin;
