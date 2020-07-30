const express = require("express")
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

const routers = require("./routers")
app.use("/", routers)

app.listen(port, () => console.log(`App is listening at port: ${port}`))