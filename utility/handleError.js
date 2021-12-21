const log = require("./log");

module.exports = (func, error) => {
  if (func && func.name)
    func.callee = {
      name: func.name,
    };
  else if (typeof func == "string") func = { "callee.name": func };

  if (error && typeof error == "string")
    error = {
      stack: error,
    };

  let errMsg = {
    ...(func && {
      functionName: ((func || {}).callee || {}).name,
    }),
    errorMsg: error.stack,
  };
  log(errMsg);
};
