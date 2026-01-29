const express = require("express")
const router = express.Router()
const Controller = require("../controllers/controller")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")

router.get("/login", Controller.loginPage)
router.post("/login", Controller.login)

router.get("/register", Controller.registerPage)
router.post("/register", Controller.register)

router.get("/logout", Controller.logout)

router.get("/", isLoggedIn, Controller.home)

router.get("/categories", isLoggedIn, Controller.categories)

router.get("/admin/categories/new", isLoggedIn, isAdmin, Controller.addCategoryPage)
router.post("/admin/categories", isLoggedIn, isAdmin, Controller.addCategory)
router.get("/admin/categories/:id/edit", isLoggedIn, isAdmin, Controller.editCategoryPage)
router.post("/admin/categories/:id", isLoggedIn, isAdmin, Controller.updateCategory)
router.post("/admin/categories/:id/delete", isLoggedIn, isAdmin, Controller.deleteCategory)

router.get("/questions/:categoryId", isLoggedIn, Controller.questions)
router.post("/questions/:id/answer", isLoggedIn, Controller.submitAnswer)
router.post("/quiz/finish", isLoggedIn, Controller.finishQuiz)

router.get("/admin/questions/new", isLoggedIn, isAdmin, Controller.addQuestionPage)
router.post("/admin/questions", isLoggedIn, isAdmin, Controller.addQuestion)
router.get("/admin/questions/:id/edit", isLoggedIn, isAdmin, Controller.editQuestionPage)
router.post("/admin/questions/:id", isLoggedIn, isAdmin, Controller.updateQuestion)
router.get("/admin/questions/:id/delete", isLoggedIn, isAdmin, Controller.deleteQuestion)

router.get("/scores", isLoggedIn, Controller.scores)

module.exports = router
