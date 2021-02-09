const express = require('express')
const user = express.Router()
const {registerUser, insertSchedule, scheduleTitle, updateSchedule ,validate} = require('../helper/validator')
const {checkToken} = require('../helper/authorization')
const {register} = require('../controller/user')
const {createSchedule, getSchedule, deleteSchedule, editSchedule, completeSchedule} = require('../controller/schedule')


user.post('/register', registerUser(), validate, register)
user.post('/schedule', checkToken, insertSchedule(), validate, createSchedule)
user.get('/schedule', checkToken, getSchedule)
user.get('/schedule/complete', checkToken, completeSchedule)
user.delete('/schedule/:title', checkToken, scheduleTitle(), validate, deleteSchedule)
user.put('/schedule/:title', checkToken, updateSchedule(), validate, editSchedule)



module.exports = user