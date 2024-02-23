// imports mongoose library
const mongoose = require("mongoose");

// defines the mongooses schema
const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },
  units: {
    type: Number,
    required: [true],
  },
  tags: {
    type: [String],
    required: [true],
  },
});

// schema to organize the course each year level
const yearlevelSchema = new mongoose.Schema(
  {
    "1st Year": [courseSchema],
    "2nd Year": [courseSchema],
    "3rd Year": [courseSchema],
    "4th Year": [courseSchema],
  }
);

//to create model named course
const Course = mongoose.model("Course", yearlevelSchema);
//to export the model
module.exports = Course;