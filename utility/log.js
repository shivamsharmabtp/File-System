const { inspect } = require("util");

module.exports = (msg) => {
  if (typeof msg == "string") msg = { msg };

  console.log(
    inspect(msg) +
      JSON.stringify(
        {
          timestamp: new Date().toString(),
        },
        undefined,
        2
      )
  );
};
