
// This is the STARTER function
const df = require("durable-functions");

module.exports = async function (context, eventHubMessage) {
    
    context.log(`JavaScript eventhub trigger function called for message ${eventHubMessage}`);

    const client = df.getClient(context);
    
    const orchestratorFunctionName = "OrchestraConductor";
    const currentInstanceId = undefined;
    const input = eventHubMessage;

    const instanceId = await client.startNew(orchestratorFunctionName, currentInstanceId, input);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.eventHubMessage, instanceId);
};