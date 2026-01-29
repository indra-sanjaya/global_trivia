function isLoggedIn(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login")
  }
  next()
}

function isAdmin(req, res, next) {
  if (req.session.role !== "admin") {
    return res.redirect("/")
  }
  next()
}

module.exports = { isLoggedIn, isAdmin }
