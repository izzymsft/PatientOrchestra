
// This is the STARTER function
const df = require("durable-functions");

module.exports = async function (context, req) {
    
    const client = df.getClient(context);
    
    const orchestratorFunctionName = req.params.functionName;
    const currentInstanceId = undefined;
    const input = req.body;

    const instanceId = await client.startNew(orchestratorFunctionName, currentInstanceId, input);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};