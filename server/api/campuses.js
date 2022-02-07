const router = require("express").Router();
const Campus = require('../db/models/campus')
const Student = require('../db/models/student')

//GET /api/campuses
router.get('/', async(req, res, next) => {
  try {
    const allCampuses = await Campus.findAll({
      include: {
        model: Student
      }
    });
    res.send(allCampuses)
  } catch (error){
    next(error)
  }
})

//POST /api/campuses
router.post('/addCampus', async(req, res, next) => {
  try {
    const newCampus = await Campus.create(req.body);
    res.send(newCampus)
  } catch (error){
    next(error)
  }
})
//GET /api/campuses/:campusId
router.get('/:campusId', async(req, res, next) => {
  try {
    const id = req.params.campusId;
    const campus = await Campus.findOne({
      where: {
        id: id
      },
      include: {
        model: Student
      }
    });
    res.send(campus)
  } catch (error){
    next(error)
  }
})

// PUT /api/campuses/editCampus/:campusId
router.put('/editCampus/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    const updated = await campus.update(req.body)
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/campuses/:campusId
router.delete('/:campusId', async(req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    await campus.destroy();
    res.send(campus);
  } catch (error){
    next(error)
  }
})

module.exports = router
