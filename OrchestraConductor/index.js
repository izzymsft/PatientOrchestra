// This is the Orchestrator Function

const df = require("durable-functions");
const sha1 = require('sha1');

module.exports = df.orchestrator(function*(context){
    
    const patientVitalsParameters = context.df.getInput();

    context.log("Starting Patient Orchestra with input =" + JSON.stringify(patientVitalsParameters));

    // Variable to contain all the results
    const output = [];

    const currentTimestamp = new Date().toISOString();

    // const uniquePatientId = sha1(currentTimestamp);

    // This activity function will generate the data base on the input from patientVitalsParameters
    const patientMetadata = yield context.df.callActivity("GeneratorProxy", patientVitalsParameters);

    // The ouput from the first activity function is used in subsequent calls
    const temperatureVitals = yield context.df.callActivity("TemperatureProxy", patientMetadata);
    const pulseVitals = yield context.df.callActivity("PulseProxy", patientMetadata);
    const diastolicVitals = yield context.df.callActivity("DiastolicProxy", patientMetadata);
    const systolicVitals = yield context.df.callActivity("SystolicProxy", patientMetadata);

    const scoreOutput = {
      totals : patientMetadata.total,
      temperature : temperatureVitals.average,
      pulse : pulseVitals.average,
      diastolic : diastolicVitals.average,
      systolic : systolicVitals.average,
    };

    output.push(patientMetadata);
    output.push(temperatureVitals);
    output.push(pulseVitals);
    output.push(diastolicVitals);
    output.push(systolicVitals);
    output.push(scoreOutput);

    // insert each row into the database via an activity function
    yield context.df.callActivity("VitalScorer", scoreOutput);

    return output;
});