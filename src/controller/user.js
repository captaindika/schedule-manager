const jwt = require('jsonwebtoken')
const User = require('../model/user')
const {responseMessage} = require('../helper/response')

const register = async(req, res) => {
  try {
    const {userId, name} = req.body
    User.create({id: userId, name})
    const token =  jwt.sign({userId, name}, process.env.APP_KEY, {})
    res.send(responseMessage(true, 'Success create user', token))
  } catch(err) {
    console.log(err)
    res.send(err)
  }
}



module.exports = {
  register
}