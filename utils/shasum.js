require('dotenv').config()
const crypto = require('crypto')

function getSum (string) {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(string).digest('hex')
}

module.exports = { getSum }