### List of References

HTTP Request and Response Headers
https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#http-triggers-and-bindings

### Managing NPM Dependencies
You should define a package.json file at the root of your Function App. Defining the file lets all functions in the app share the same cached packages, which gives the best performance. If a version conflict arises, you can resolve it by adding a package.json file in the folder of a specific function.

### Errors Where Binding Types are Not Registered


Sometimes you may encounter errors like these:

```shell
[5/17/2019 3:14:46 AM] Job host started
[5/17/2019 3:14:46 AM] The following 3 functions are in error:
[5/17/2019 3:14:46 AM] HttpStart: The binding type(s) 'orchestrationClient' are not registered. Please ensure the type is correct and the binding extension is installed.
[5/17/2019 3:14:46 AM] OrchestraConductor: The binding type(s) 'orchestrationTrigger' are not registered. Please ensure the type is correct and the binding extension is installed.
[5/17/2019 3:14:46 AM] TemperatureProxy: The binding type(s) 'activityTrigger' are not registered. Please ensure the type is correct and the binding extension is installed.

To address this you will need to run the following command in the root folder of your function project
```