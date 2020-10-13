const express = require("express");
const cors = require("cors")
require("./server/db/mongoose");
var registerRouter = require("./server/router/registerRouter");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(registerRouter);
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
