const express = require("express");
const {
  getAllDevotees,
  registerDevotee,
  getDevoteesDetails,
  updateDevotee,
  deleteDevotee,
} = require("../controller/devoteeController");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

router.route("/devotee/register").post(registerDevotee);

router.route("/devotees").get(isAuthenticated, getAllDevotees);

router
  .route("/devotee/:id")
  .get(getDevoteesDetails)
  .delete(isAuthenticated, authorizeAdmin, deleteDevotee);

router.route("/devotee/update/:id").put(updateDevotee);

module.exports = router;
