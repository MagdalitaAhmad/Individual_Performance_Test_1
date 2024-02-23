//import all needed dependencies
const express = require('express');
const mongoose = require('mongoose');
const courseSchema = require('./modules/courseModel');
const app = express();
//middleware
app.use(express.json());

// Root Route of the API and to Test if working
app.get('/', (req, res) => {
    res.send("Root route of the API");
});

//To get all course and arrange alphabetical
app.get("/courses/getAllCoursesandSort", async (req, res) => {
    try {
      // to search for all the courses and year level
      const CoursesAndYearlevel = await courseSchema.find();
      let courses = [];
      CoursesAndYearlevel.forEach((yearAndCourse) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (yearAndCourse[yearKey]) {
            courses.push(...yearAndCourse[yearKey]);
          }
        });
      });
      courses.sort((a, b) => a.description.localeCompare(b.description));
      res.status(200).json(courses);
    } catch (err) {
      console.log(error);
      res.status(500).json({ message: err.message });
    }
});

// To get courses name and specialization of each course
app.get("/courses/getCoursesDescriptionAndTags", async (req, res) => {
    try {
      const CoursesAndYearlevel = await courseSchema.find();
      let courses = [];
      CoursesAndYearlevel.forEach((yearAndCourse) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (yearAndCourse[yearKey]) {
            courses.push(...yearAndCourse[yearKey]);
          }
        });
      });

      const descriptionsAndTags = courses.map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
      res.status(200).json(descriptionsAndTags);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });

//To Get all published BSIS (Bachelor of Science in Information Systems) and BSIT (Bachelor of Science in Information Technology) courses from the curriculum.
app.get("/courses/getAllPublishedCourses", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });

      res.status(200).json(courses);
    } catch (err) {
      console.log(error);
      res.status(500).json({ message: err.message });
    }
  });
  
// To connect the api to the Database
mongoose.connect('mongodb://localhost:27017/mongo-test')
    .then(() => {
        console.log("Connected to MongoDB ...");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});


