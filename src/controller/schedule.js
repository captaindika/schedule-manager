const Schedule = require('../model/schedule')
const {responseMessage} = require('../helper/response')
const {Sequelize} = require('sequelize')
const Op = Sequelize.Op;

const createSchedule = async(req, res) => {
    try {
      const{userId} = req.user
      let {title, description, time} = req.body
      title = title.toLowerCase()
      description = description.toLowerCase()
      await Schedule.create({title, description, time, userId})
      res.send(responseMessage(true, 'Schedule created', req.body))
    } catch (err) {
      console.log(err)
      res.send(responseMessage(false, err))
    }
    
}

const getSchedule = async(req, res) => {
  try {
    const {userId} = req.user
    const result = await Schedule.findAll({where: {user_id: userId, title: {[Op.not]: null}, desc: {[Op.not]: null}, time: {[Op.not]: null}}})
    res.send(responseMessage(true, 'List of your schedule', result))
  }catch (err) {
    console.log(err)
    res.send(responseMessage(false, err))
  }
}

const completeSchedule = async(req, res) => {
  try {
    const {userId} = req.user
    const completeSchedule = await Schedule.findAll({where: {userId, isDone: true}})
    res.send(completeSchedule)
  }catch (err) {
    console.log(err)
    res.send(err)
  }
}
const deleteSchedule = async(req, res) => {
  try {
      const {userId} = req.user
      const {title} = req.params
      const result = await Schedule.destroy({where: {user_id: userId, title: {[Op.like]: `%${title}%`}}})
      if (!result) {
        throw 'Schedule not found'
      }
      res.send(responseMessage(true,'Schedule deleted'))
  } catch (err) {
    console.log(err)
    res.send(responseMessage(false, err))
  }
}

const editSchedule = async(req, res) => {
  try {
    const {userId} = req.user
    const {title} = req.params
    const {newTitle, description, time, done} = req.body
    const result = await Schedule.findOne({where: {title: {[Op.like]: `%${title}%`}, user_id: userId}})
    const data = {
      title: newTitle || result.title,
      desc: description || result.description, 
      time: time || result.time,
      isDone: done || result.is_done
    }

    const resultUpdate = await Schedule.update({title: data.title, desc: data.desc, time: data.time, isDone: data.isDone}, {where: {user_id: userId, title: {[Op.like]: `%${title}%`}}})
    if (resultUpdate[0] === 0) {
      throw 'Data not found'
    }
    res.send(responseMessage(true, 'Data updated', resultUpdate))
  } catch(err) {
    console.log(err)
    res.send(responseMessage(false, err))
  }
}

module.exports = {
  createSchedule,
  getSchedule,
  completeSchedule,
  deleteSchedule,
  editSchedule
}