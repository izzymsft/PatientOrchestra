// This is the Orchestrator Function

const df = require("durable-functions");
const sha1 = require('sha1');

module.exports = df.orchestrator(function*(context){
    
    context.log("Starting Patient Orchestra ...");

    // Variable to contain all the results
    const output = [];

    const currentTimestamp = new Date().toISOString();

    const uniquePatientId = sha1(currentTimestamp);

    // These are the parameters that will be used to generate sample data
    // 250,000 vitals generates approximately 30MB of payload
    const patientVitalsParameters = {
        "id" : uniquePatientId, // patient identifier
        "total": 16, // total number of vitals to generate
        "min_temperature": 98.5,
        "max_temperature": 99.8,
        "min_pulse": 80,
        "max_pulse": 85,
        "min_diastolic": 85,
        "max_diastolic": 90,
        "min_systolic": 120,
        "max_systolic": 130
      };

    // This activity function will generate the data base on the input from patientVitalsParameters
    const patientMetadata = yield context.df.callActivity("GeneratorProxy", patientVitalsParameters);

    // The ouput from the first activity function is used in subsequent calls
    const temperatureVitals = yield context.df.callActivity("TemperatureProxy", patientMetadata);
    const pulseVitals = yield context.df.callActivity("PulseProxy", patientMetadata);
    const diastolicVitals = yield context.df.callActivity("DiastolicProxy", patientMetadata);
    const systolicVitals = yield context.df.callActivity("SystolicProxy", patientMetadata);

    output.push(patientMetadata);
    output.push(temperatureVitals);
    output.push(pulseVitals);
    output.push(diastolicVitals);
    output.push(systolicVitals);

    // insert each row into the database via an activity function

    return output;
});