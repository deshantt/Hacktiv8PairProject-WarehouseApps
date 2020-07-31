const express = require("express")
const router = express.Router()

const ProductController = require("../controllers/ProductController")

// Read
router.get("/", ProductController.show)
router.get("/:id/stock", ProductController.showAllStock)

// Create
router.get("/add", ProductController.addGet)
router.post("/add", ProductController.addPost)

router.get("/:id/addstock", ProductController.addGetStock)
router.post("/:id/addstock", ProductController.addPostStock)

// Update
router.get("/:id/edit", ProductController.editGet)
router.post("/:id/edit", ProductController.editPost)

// Delete
router.get("/:id/delete", ProductController.delete)

module.exports = router