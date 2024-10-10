const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Use express.json() to parse JSON request bodies
app.use(express.json())

// Define the port
app.listen(8080, () => {
  console.log(`Server started on port: 8080`);
});

// Establish the mongodb connection using Promise
// mongoose.connect("mongodb://localhost:27017/students_database")
// .then(()=>{ 
//     console.log("Connection is successful"); 
// }).catch( (error) =>{
//     console.log("Failed to establish with error: ", error);
// } );

async function mongoDBConnection() {
    try {
        await mongoose.connect("mongodb://localhost:27017/students_database");
        console.log("Connection is successful"); 
    } catch (error) {
        console.log(error);
    } 
}
mongoDBConnection();
// Defining Schema
const studentSchema = new mongoose.Schema({
  rollNo: { type: Number },
  name: {type: String },
  city: { type: String },
  graduation: { type: String }
},
{ collection: "students_collection" }
);
// Create the Model - Student
const Student = mongoose.model("Student", studentSchema);
app.get('/allStudents', async (request, response) => { 
  console.log("Fetching students from mongodb... ");
  console.log(`Request path: ${request.url}`);
  // Fetch all students using fetch({})
  const studentsList = await Student.find({});
  return response.status(200).json(studentsList);
});

// Select method PUT and URL - http://localhost:8080/update
app.put("/update", async (request, response) => {
  const { rollNo, name, city, graduation } = request.body;
 const student = await Student.findOneAndUpdate(
   { rollNo: rollNo }, // Find condition
   { name: name, city: city, graduation: graduation }, // Update fields
   { new: true, upsert: true } 
 ); 
  return response.status(200).json(student);
});

// Select method GET and URL - http://localhost:8080/student/22
app.get('/student/:rollNumber', async (request, response) => {
  const rollNumber = request.params.rollNumber;
  const student = await Student.findOne({rollNo: rollNumber})
  return response.status(200).json(student);
});
// Select method DELETE and URL -  http://localhost:8080/delete/55
app.delete('/delete/:rollNumber', async (request, response) => {
  const rollNumber = request.params.rollNumber;
  const student = await Student.findOneAndDelete({rollNo: rollNumber});
  if (!student) {
      return response.status(400).json("Student Not Found");
  }
  return response.status(200).json("Student Deleted Successfully");
});