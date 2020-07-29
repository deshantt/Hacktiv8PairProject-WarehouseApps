const express = require("express")
const router = express.Router()

const EmployeeController = require("../controllers/EmployeeController")

// Read
router.get("/", EmployeeControlller.show)

// Create
router.get("/add", EmployeeControlller.addGet)
router.post("/add", EmployeeControlller.addPost)

// Update
router.get("/:id/edit", EmployeeControlller.editGet)
router.post("/:id/edit", EmployeeControlller.editPost)

// Delete
router.get("/:id/delete", EmployeeControlller.delete)

module.exports = router