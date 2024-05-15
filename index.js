import express from 'express'
import routes from './src/routes/index.js'
import db from './src/config/db.js'
const app = express()

app.use(express.json())
db.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Connected to PalmsTownHall Database")
    }
})
app.use('/', routes)

app.listen(3000, () => console.log("express server initialized successfully"))