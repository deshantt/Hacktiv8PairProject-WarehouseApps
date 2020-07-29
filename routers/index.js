const express = require("express")
const router = express.Router()

const employeeRouter = require("./employee")
const productRouter = require("./product")
const warehouseRouter = require("./warehouse")

const Controller = require("../controllers/Controller")

router.get("/login", Controller.login)

router.use("/employees", employeeRouter)
router.use("/products", productRouter)
router.use("/warehouses", warehouseRouter)

module.exports = router