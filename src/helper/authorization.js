const jwt = require('jsonwebtoken')
const {responseMessage} = require('../helper/response')

const checkToken = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    let tokenJwt = authorization.slice(7, authorization.length)
    try {
      tokenJwt = jwt.verify(tokenJwt, process.env.APP_KEY)
      if (tokenJwt) {
        req.user = tokenJwt
        next()
      } else {
        res.status(401).send(responseMessage(false, 'Invalid token'))
      }
    } catch(err) {
      console.log('error token')
      res.status(401).send(responseMessage(false, 'Token unrecognized'))
    }
  } else {
    res.status(401).send(responseMessage(false, 'Please insert token'))
  }
}


module.exports = {
  checkToken,
}