const express = require("express");
const router = express.Router();
const cors = require("cors");

//middleware
const app = express();

//use cors to allow cross origin resource sharing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/auth", require("./routes/auth"));
app.use("/movie", require("./routes/movies"));

app.get('/', (req, res) => { 
  res.send("<h1>Express Server is running</h1>") 
}) 

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
