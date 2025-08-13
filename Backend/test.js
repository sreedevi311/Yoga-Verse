const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

const asanaSchema = new mongoose.Schema({
  asana_name: String,
  sanskrit_meaning: String,
  origin: String,
  historical_background: String,
  benefits: [String],
  category: String,
  image_url: String
});

const Asana = mongoose.model("Asana", asanaSchema);

Asana.find().then(docs => {
  console.log("Found documents:", docs);
  mongoose.connection.close();
});
