const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const toastsRoutes = require("./routes/toasts");

const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use("/toasts", toastsRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/toast-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
