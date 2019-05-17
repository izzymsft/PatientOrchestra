// This is the Orchestrator Function

const df = require("durable-functions");

module.exports = df.orchestrator(function*(context){
    
    context.log("Starting chain sample");
    
    var patientMetadata = {
        "id" : "38bc7ab",
        "age" : 35,
        "gender" : "M",
        "total" : 1,
        "vitals" : [
            {
                "pulse" : 80,
                "temperature": 99,
                "diastolic": 80,
                "systolic": 120
            },
            {
                "pulse" : 83,
                "temperature": 98,
                "diastolic": 82,
                "systolic": 130
            },
            
        ]
    };

    // Variable to contain all the results
    const output = [];

    const patientData = yield context.df.callActivity("TemperatureProxy", patientMetadata);

    output.push(yield context.df.callActivity("TemperatureProxy", patientMetadata));
    output.push(yield context.df.callActivity("TemperatureProxy", patientMetadata));
    output.push(yield context.df.callActivity("TemperatureProxy", patientMetadata));

    return output;
});