var Connection = require('tedious').Connection;  
var config = {  
	userName: 'developer08',  
	password: 'Jvion08PatientScores09@',  
	server: 'jviondemo08.database.windows.net',  
	// If you are on Azure SQL Database, you need these next options.  
	options: {encrypt: true, database: 'patientscores'}  
}; 
 
module.exports = async function (context, vitalStats) {

  console.log("Processing Scores: " + JSON.stringify(vitalStats));
}