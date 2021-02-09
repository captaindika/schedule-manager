const responseMessage = (success, message, data) => {
  if (!data) {
    return {
      success,
      message
    }
  }else {
    return {
      success,
      message,
      data}
    }
}

module.exports = {
  responseMessage
}