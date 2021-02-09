const { body, validationResult, param } = require('express-validator')
const regexDateTime = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
const registerUser = () => {
  return [
    body('userId').isString().isLength({min:36, max:36}).withMessage('User id length must 36 character'),
    body('name').isString().isLength({min:4}).withMessage('Name length must be greater than 3 character')
  ]
}

const insertSchedule = () => {
  return [
    body('title').isString().isLength({min:5}).matches(/[a-z,A-Z,0-9]/gm).withMessage('Minimum length is 5 and special chararcter not allowed'),
    body('description').isString().withMessage('Description type is text').optional(),
    body('time').matches(regexDateTime).withMessage('time format yyyy-mm-dd hh:mm:ss')

  ]
}

const scheduleTitle = () => {
  return [
    param('title').matches(/[a-z,A-Z,0-9]/gm).withMessage('special character not allowed')
  ]
}

const updateSchedule = () => {
  return[
    param('title').isString().isLength({min:4}).matches(/[a-z,A-Z,0-9]/gm).withMessage('Minimum length is 5 and special chararcter not allowed'),
    body('newTitle').isString().isLength({min:5}).matches(/[a-z,A-Z,0-9]/gm).withMessage('Minimum length is 5 and special chararcter not allowed').optional(),
    body('description').isString().withMessage('Description type is text').optional(),
    body('time').matches(regexDateTime).withMessage('format yyyy-mm-dd').optional(),
    body('done').isBoolean().withMessage('done type must be a boolean')

  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  insertSchedule,
  validate,
  updateSchedule,
  registerUser,
  scheduleTitle
}