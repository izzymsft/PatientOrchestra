### List of References

HTTP Request and Response Headers
https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#http-triggers-and-bindings

### Managing NPM Dependencies
You should define a package.json file at the root of your Function App. Defining the file lets all functions in the app share the same cached packages, which gives the best performance. If a version conflict arises, you can resolve it by adding a package.json file in the folder of a specific function.