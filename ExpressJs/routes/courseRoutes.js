const express = require("express");
const Course = require("../schemas/courseSchema");
const router = express.Router();
//const pinologger = require('../middleware/pinoMiddleware');


router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).send(courses);
      } catch (err) {
        //pinologger.error('Error fetching courses:', err);
        res.status(500).send({ error: 'Failed to fetch courses' });
      }
});

router.get('/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).send({ error: 'Course not found' });
      }
      res.status(200).send(course);
    } catch (err) {
      //pinologger.error('Error fetching course:', err);
      res.status(500).send({ error: 'Failed to fetch course' });
    }
});

router.put("/:id", async (req, res) => {
try {
    const updateCourse = await Course.findByIdAndUpdate(req.params.id, {courseFee:req.body.courseFee,courseDuration:req.body.courseDuration},{new:true});
    res.send({ message: 'Course updated successfully', course: updateCourse });
    } catch (err) {
    res.status(500).send({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
try 
{
     const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).send({ error: 'Course not found' });
      }
    const updateCourse = await Course.findByIdAndDelete(req.params.id);
    res.send({ message: 'Course deleted successfully' });
} catch (err) {
res.status(500).send({ error: err.message });
}
});

router.post("/", (req, res) => {
    // console.log(req.body);
    // Insert the data into DB using Schema
    let newCourse = new Course({
        courseName: req.body.courseName,
        courseId: req.body.courseId,
        courseDuration: req.body.courseDuration,
        courseFee: req.body.courseFee
    });
    newCourse.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        //pinologger.error('Error creating course:', err);
        res.status(500).send({ error: 'Failed to create course' });
    });
});

module.exports = router;
