import express from 'express'
import mainRoute from './mainRoute.js'
import login from './user/login.js'
import forgotPassword from './user/forgotPassword.js'
import signup from './user/signup.js'

const routes = express.Router()

routes.use(
    '/', mainRoute
)
routes.use('/user/login', login)
routes.use('/user/forgot-password', forgotPassword)
routes.use('/user/signup', signup)
export default routes