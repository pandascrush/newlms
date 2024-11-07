import express from "express";
import upload from "../../middleware/fileUpload.mjs";
import {
  addCourse,
  addLearnerGroup,
  addLearningObjective,
  addLearningOutcome,
  addModule,
  addPrerequisite,
  getActivityData,
  getAllCourses,
  getCountsModuleAndEnrollment,
  getCourse,
  getLearnerGroup,
  getLearningObjectives,
  getLearningOutcomes,
  getModule,
  getModuleByCourseId,
  getModulePageContent,
  getModulesByCourseId,
  getOtherModules,
  getPrerequisites,
  getSingleCourse,
  getStructuredData,
  submitCourseContent,
  updateCourseById,
  updateModule,
  updateModuleImage,
  updatePageContent,
} from "../../controller/Course/course.controller.mjs";
const router = express.Router();

router.post("/addcourse", upload.single("courseImage"), addCourse);
router.post("/addmodule", upload.single("moduleImage"), addModule);

router.get("/getcourse", getCourse);
router.get("/getallcourse", getAllCourses);
router.put(
  "/updatecourse/:courseId",
  upload.single("courseImage"),
  updateCourseById
);
router.get("/getcourse/:id", getSingleCourse);
// Module Section
router.get("/getmodule", getModule);
router.put("/updatemodule", updateModule); // update the module name
router.put("/:moduleid/image", upload.single("moduleImage"), updateModuleImage);
router.get("/getmodulepagecontent/:moduleid", getModulePageContent);
router.put("/updatepagecontent", updatePageContent); // update page content
router.get("/getmodule/:courseId", getModulesByCourseId); // using isnide the Lessons compoennt
router.get("/getmodules/:courseId", getModuleByCourseId); // using inside the Coursecontent component

router.post("/submitcon", upload.single("video"), submitCourseContent); // using inside the Coursecontent component
router.get("/structured-data", getStructuredData);

router.get("/activity/:course_id/:module_id", getActivityData);
router.get("/:course/:module", getOtherModules);
router.get("/moduleandenrollcount", getCountsModuleAndEnrollment);

// -----------------------------------------------------------------------------------

router.post("/add-prerequisite", addPrerequisite);
router.get("/get-prerequisite", getPrerequisites);

router.post("/add-learning-objective", addLearningObjective);
router.get("/get-learning-objectives", getLearningObjectives);

router.post("/add-learning-outcomes", addLearningOutcome);
router.get("/get-learning-outcomes", getLearningOutcomes);

router.get("/get-learner-group", getLearnerGroup);
router.post("/add-learner-group", addLearnerGroup);

export default router;
