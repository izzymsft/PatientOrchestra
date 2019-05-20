
var Connection = require('tedious').Connection;

var config = {  
    userName: 'developer08',  
    password: 'Jvion08PatientScores09@',  
    server: 'jviondemo08.database.windows.net',  

    // When you connect to Azure SQL Database, you need these next options.  
    options: {encrypt: true, database: 'patientscores'}  
};  

var connection = new Connection(config);
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");
}); 

function scorePatientVitals(patientStatObject) {  
    
    // Extract the Patient Vitals Summary Data from Here
    const PatientId = patientStatsObject.PatientId;
    const MinTemp = patientStatObject.MinTemp;

    const SQLStatement = "INSERT INTO dbo.PatientScores ()";

    var request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    
    request.addParameter('Name', TYPES.VarChar,'SQL Server Express 2014');  
    request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2014');  
    request.addParameter('Cost', TYPES.Decimal, 11);  
    request.addParameter('Price', TYPES.Int,11);  
    
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            console.log("Transaction id of inserted item is " + column.value);  
          }  
        });  
    }); 

    connection.execSql(request);  
}  

module.exports = async function (context, vitalStats) {
    
    context.log('Vitals Scorer Called ...');

    scorePatientVitals(vitalStats);
};