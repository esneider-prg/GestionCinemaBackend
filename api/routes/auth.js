const express = require('express')
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken')
const {register,basicData} = require('../controllers/auth/Register/register')
const login = require('../controllers/auth/login/login')
const loginWithToken = require('../controllers/auth/login/login-with-token')

const router = express.Router()


router.post('api/v1/register', [], register)
router.post('api/v1/register/basicData',[authorizeBearerToken], basicData)


router.route('api/v1/login')
.post([], login)
.get([authorizeBearerToken], loginWithToken);






module.exports = router
