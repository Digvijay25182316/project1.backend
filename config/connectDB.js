const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`database is connected to ${data.connection.host}`)
    )
    .catch((err) => console.error(err));
};
