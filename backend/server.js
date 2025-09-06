const express = require("express");
const app  = express();
const port = 3000

app.use(express.json())

app.get("/", (req,res) => {
    res.set("content-type", "text/html")
    res.status(200).send("<h1 style='text-align: center'>The application is running!</h1>")
})

app.listen(port, () => {
    console.log(`App is running in port ${port}`)
})