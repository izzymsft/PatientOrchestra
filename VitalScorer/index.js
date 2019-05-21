const cosmos = require('@azure/cosmos');
const endpoint = "https://mada36.documents.azure.com:443/"; // process.env.COSMOS_API_URL;
const masterKey = "MtKznr4lG66f4Rt61JrognR0r4yxuTN3Hts8R8cLs6xkosFZ8URYGJ6VT59vnbGN5LEUCTMl76oGGZOUGJolWQ=="; // process.env.COSMOS_API_KEY;
const { CosmosClient } = cosmos;
const databaseId = "jvion";
const containerId = "PatientScores";

const client = new CosmosClient({ endpoint, auth: { masterKey } });

// All function invocations also reference the same database and container and share the connections
const container = client.database(databaseId).container(containerId);

async function readContainer() {
  const { body: containerDefinition } = await client.database(databaseId).container(containerId).read();
  console.log(`Reading container:\n${containerDefinition.id}\n`);
}

async function createPatientScore(patientRecord) {
  const { item } = await client.database(databaseId).container(containerId).items.create(patientRecord);
};

module.exports = async function (context, vitalStats) {

  /*
  readContainer()
  .then(() => createPatientScore(vitalStats))
  .catch((error) => { exit(`Completed with error ${JSON.stringify(error)}`) });
  */

  console.log(vitalStats);
}