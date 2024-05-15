import express from 'express'
import mainRoute from './mainRoute.js'
import login from './user/login.js'

const routes = express.Router()

routes.use(
    '/', mainRoute
)
routes.use('/user/login', login)

export default routes