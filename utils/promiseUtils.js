module.exports = {
    tap: (fn, arg) => {
      fn.call(this, arg)
      return arg
    },
    tapReject: (fn, arg) => {
      fn.call(this, arg)
      throw arg
    }
  }
  