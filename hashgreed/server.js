const mongoose = require("mongoose");
const configureServer = () => {
  const express = require("express");
  const bodyParser = require("body-parser");
  const path = require("path");

  const certifications = require("./routes/api/certifications");
  const upload = require("./routes/api/upload");
  const reactions = require("./routes/api/reactions");

  const app = express();
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
  app.use("/api/certifications", certifications);
  app.use("/api/upload", upload);
  app.use("/api/reactions", reactions);

  app.use("/certifications", certifications); // for server
  app.use("/upload", upload); // for server
  app.use("/reactions", reactions); // for server

  const port = process.env.PORT || 5000;

  app.listen(port, () =>
    console.log(`Server up and running on port ${port} !`)
  );
};

const connectDb = async () => {
  const keys = require("./config/keys");
  const db = keys.mongoURI;
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB successfully connected");
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

const setupServer = async () => {
  await connectDb();
  configureServer();
};

setupServer();
