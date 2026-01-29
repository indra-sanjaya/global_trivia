const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")

const app = express()
const router = require("./routes")
const PORT = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  res.locals.role = req.session.role
  next()
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})
