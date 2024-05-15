import { Router } from "express";

const mainRoute = Router()

mainRoute.get('/', (req, res) => {
    res.send("This is home Route")
})

export default mainRoute