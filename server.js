const app = require("./app");
const connectDB = require("./config/connectDB.js");

//uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to uncaught exception");
  process.exit(1);
});

//connection database
connectDB();

const port = process.env.PORT || 5050;

const host = `http://localhost:${port}`;

const server = app.listen(port, () => {
  console.log(`server is running on port:${host}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
