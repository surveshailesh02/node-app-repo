const express = require('express');
const adhar = require('./adhar');
const mongoose = require('mongoose');
const app = express();

app.use('/adhar', adhar);

app.listen(8080, () => {
  console.log(`Server started on port: 8080`);
});


async function mongoDBConnection() {
  try {
      await mongoose.connect("mongodb://localhost:27017/adhar_database");
      console.log("Connection is successful"); 
  } catch (error) {
      console.log(error);
  } 
}
mongoDBConnection();

// Defining Schema
const adharSchema = new mongoose.Schema({
  adharNo: { type: Number },
  fullName: {type: String },
  isMarried: {type: Boolean},
  city: { type: String },
  pin: {type: Number},
  country: { type: String }
},
{ collection: "adhar_collection" }
);
// Create the Model - Adhar
const adhar1 = mongoose.model("adhar", adharSchema);
app.get('/alladhars', async (request, response) => { 
  console.log("Fetching adhar from mongodb... ");
  console.log(`Request path: ${request.url}`);
  // Fetch all students using fetch({})
  const adharsList = await adhar1.find({});
  return response.status(200).json(adharsList);
});

// app.get('/all', (req, res) => {
//   console.log('returning response.....');
//   return res.send("Response from all");
// });
