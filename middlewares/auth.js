function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    return next()
  } else {
    return res.redirect("/login")
  }
}

function isAdmin(req, res, next) {
  if (req.session.role === "admin") {
    return next()
  } else {
    return res.redirect("/")
  }
}

module.exports = { isLoggedIn, isAdmin }
