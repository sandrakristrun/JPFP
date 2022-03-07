const router = require("express").Router();

const Student = require("../db/models/student");
const Campus = require("../db/models/campus");

//GET /api/students
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.send(allStudents);
  } catch (error) {
    next(error);
  }
});

//POST /api/students
router.post("/addStudent", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.send(newStudent);
  } catch (error) {
    next(error);
  }
});

//GET /api/students/:studentId
router.get("/:studentId", async (req, res, next) => {
  try {
    const id = req.params.studentId;
    const student = await Student.findOne({
      where: {
        id: id,
      },
      include: {
        model: Campus,
      },
    });
    res.send(student);
  } catch (error) {
    next(error);
  }
});

// PUT /api/students/editStudent/:studentId
router.put("/editStudent/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const updated = await student.update(req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/students/:studentId
router.delete("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    await student.destroy();
    res.send(student);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
