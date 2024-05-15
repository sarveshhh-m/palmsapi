import express from 'express'
import mainRoute from './user/mainRoute.js'

const routes = express.Router()

routes.use(
    '/', mainRoute
)

export default routes