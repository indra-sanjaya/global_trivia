const { User, Category, Question, Score, UserQuestion, Sequelize } = require("../models/index")
const bcrypt = require("bcryptjs")
const {Op} = require("sequelize")
const question = require("../models/question")

class Controller {
  static home(req, res) {
    try {
      res.render("home")
    } catch (error) {
      res.send(error)
    }
  }

  static loginPage(req, res) {
    try {
      if (req.session.userId) return res.redirect("/")
      res.render("login")
    } catch (error) {
      res.send(error)  
    }    
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw { msg: "Invalid email or password" }
      }

      req.session.userId = user.id
      req.session.role = user.role
      res.redirect("/")
    } catch (error) {
      req.flash("error", error.msg)
      res.redirect("/login")
    }
  }

  static registerPage(req, res) {
    if (req.session.userId) return res.redirect("/")
    res.render("register")
  }

  static async register(req, res) {
    try {
      await User.create(req.body)
      res.redirect("/login")
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(e => e.message)
        req.flash("error", messages)
      } else {
        res.send(error)
      }
      res.redirect("/register")
    }
  }

  static logout(req, res) {
    try {
      req.session.destroy(() => {
        res.redirect("/login")
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async categories(req, res) {
    try {
      const keyword = {
        where: {},
        order: [['name', 'asc']]
      }

      if (req.query.name) {
        keyword.where.name = {
          [Op.iLike]: `%${req.query.name}%`
        }
      }

      const categories = await Category.findAll(keyword)
      res.render("categories", { categories })
    } catch (error) {
      res.send(error)
    }
  }

  static async questions(req, res) {
    try {
      const questions = await Question.findAll({
        where: { CategoryId: req.params.categoryId }
      })

      res.render("questions", {
        questions,
        categoryId: req.params.categoryId
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async finishQuiz(req, res) {
    try {
      const { categoryId, answers } = req.body
      const userId = req.session.userId

      let correctCount = 0

      for (const [key, userAnswer] of Object.entries(answers)) {
        const questionId = key.replace("q_", "")
        const question = await Question.findByPk(questionId)
        const isCorrect = userAnswer === question.answer

        if (isCorrect) correctCount++

        await UserQuestion.create({
          UserId: userId,
          QuestionId: question.id,
          answer: userAnswer,
          isCorrect
        })
      }

      await Score.create({
        UserId: userId,
        CategoryId: Number(categoryId),
        value: correctCount * 10
      })

      res.redirect("/scores")
    } catch (error) {
      res.send(error.message)
    }
  }

  static async scores(req, res) {
    try {
      const scores = await Score.findAll({
        include: [User, Category],
        order: [["value", "DESC"]]
      })

      if (scores.length) {
        const maxScore = scores[0].value
        scores.forEach(s => (s.maxValue = maxScore)) 
      }

      res.render("scores", { scores })
    } catch (error) {
      res.send(error)
    }
  }

  static addCategoryPage(req, res) {
    try {
      res.render("addCategory")
    } catch (error) {
      res.send(error)
    }
  }

  static async addCategory(req, res) {
    try {
      await Category.create(req.body)
      req.flash("success", "Category created")
      res.redirect("/categories")
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(e => e.message)
        req.flash("error", messages)
      } else {
        res.send(error)
      }
      res.redirect("/admin/categories/add")
    }
  }

  static async editCategoryPage(req, res) {
    try {
      const category = await Category.findByPk(req.params.id)
      res.render("editCategory", { category })
    } catch (error) {
      res.send(error)
    }
  }

  static async updateCategory(req, res) {
    try {
      await Category.update(req.body, {
        where: { id: req.params.id }
      })
      req.flash("success", "Category updated")
      res.redirect("/categories")
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(e => e.message)
        req.flash("error", messages)
      } else {
        res.send(error)
      }
      res.redirect(`/admin/categories/${req.params.id}/edit`)
    }
  }

  static async deleteCategory(req, res) {
    try {
      await Category.destroy({ where: { id: req.params.id } })
      req.flash("success", "Category deleted")
      res.redirect("/categories")
    } catch (error) {
      req.flash("error", "Failed to delete category")
      res.redirect("/categories")
    }
  }

  static async addQuestionPage(req, res) {
    try {
      const categories = await Category.findAll()
      res.render("addQuestion", { categories })
    } catch (error) {
      res.send(error)
    }
  }

  static async addQuestion(req, res) {
    try {
      await Question.create({
        ...req.body,
        UserId: req.session.userId
      })
      req.flash("success", "Question created")
      res.redirect("/categories")
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(e => e.message)
        req.flash("error", messages)
      } else {
        res.send(error)
      }
      res.redirect("/admin/questions/add")
    }
  }

  static async editQuestionPage(req, res) {
    try {
      const question = await Question.findByPk(req.params.id)
      const categories = await Category.findAll()
      res.render("editQuestion", { question, categories })
    } catch (error) {
      res.send(error)
    }
  }

  static async updateQuestion(req, res) {
    try {
      await Question.update(req.body, {
        where: { id: req.params.id }
      })
      req.flash("success", "Question updated")
      res.redirect("/categories")
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(e => e.message)
        req.flash("error", messages)
      } else {
        res.send(error)
      }
      res.redirect(`/admin/questions/${req.params.id}/edit`)
    }
  }

  static async deleteQuestion(req, res) {
    try {
      const question = await Question.findByPk(req.params.id)
      await Question.destroy({ where: { id: req.params.id } })
      req.flash("success", "Question deleted")
      res.redirect(`/questions/${question.CategoryId}`)
    } catch (error) {
      console.log(error);
      req.flash("error", "Failed to delete question")
      res.redirect(`/questions/${question.CategoryId}`)
    }
  }
}

module.exports = Controller
