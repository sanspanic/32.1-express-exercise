const express = require("express");
const app = express();
const ExpressError = require("./expressError");

const { makeArray, convertValidate, mean, mode, median } = require("./helpers");

app.get("/mean", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass in a query key of nums with a comma separates list of numbers",
      400
    );
  }
  let stringsOfNums = makeArray(req);
  let nums = convertValidate(stringsOfNums);

  if (nums instanceof Error) {
    throw new ExpressError(nums.message, 400);
  }

  let result = {
    operation: "mean",
    result: mean(nums),
  };

  return res.send(result);
});

app.get("/median", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass in a query key of nums with a comma separates list of numbers",
      400
    );
  }
  let stringsOfNums = makeArray(req);
  let nums = convertValidate(stringsOfNums);

  if (nums instanceof Error) {
    throw new ExpressError(nums.message, 400);
  }

  let result = {
    operation: "median",
    result: median(nums),
  };

  return res.send(result);
});

app.get("/mode", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let stringsOfNums = makeArray(req);
  let nums = convertValidate(stringsOfNums);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message, 400);
  }

  let result = {
    operation: "mode",
    result: mode(nums),
  };

  return res.send(result);
});

/** general error handler **/

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
