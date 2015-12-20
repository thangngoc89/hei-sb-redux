
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// Set Code isValid and isDone value
Parse.Cloud.beforeSave("Code", function(request, response) {
  if (!request.object.get("isValid")) {
    request.object.set("isValid", true);
  }

  if (!request.object.get("isDone")) {
    request.object.set("isDone", false);
  }

  response.success();
});
