const db = require("../models")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const moment = require("moment")

module.exports = function (app) {
  app.get("/", (req, res, next) => {
    res.send("index")
  })

  app.post("/", (req, res) => {
    db.User.findOne({ username: req.body.username }).exec((err, results) => {
      //   console.log(results)
      if (err || !results) {
        res.json(null)
      } else {
        bcrypt.compare(
          req.body.password,
          results.password,
          (error, response) => {
            if (error) {
              res.json(null)
            } else if (response) {
              res.json(results)
            } else {
              res.json(null)
            }
          }
        )
      }
    })
  })

  app.get("/api/messages", (req, res, next) => {
    db.Message.find()
      .sort({ orderId: -1 })
      .limit(10)
      .populate("user")
      .lean({ virtuals: true })
      .exec((err, results) => {
        if (err) {
          return next(err)
        }
        res.json(results)
      })
  })

  app.get("/api/messages/more", (req, res, next) => {
    db.Message.find()
      .sort({ orderId: -1 })
      .skip(10)
      .limit(10)
      .populate("user")
      .lean({ virtuals: true })
      .exec((err, results) => {
        if (err) {
          return next(err)
        }
        res.json(results)
      })
  })

  app.post("/api/messages", (req, res, next) => {
    const message = new db.Message({
      title: req.body.title,
      text: req.body.message,
      user: req.body.user._id,
      timestamp: moment().format("MMMM Do YYYY"),
    })

    message.save(function (err) {
      if (err) {
        return next(err)
      }
      res.json(message)
    })
  })

  app.post("/signup", (req, res) => {
    const adjustedUsername = req.body.username.trim()

    const user = new db.User({
      username: adjustedUsername,
      password: bcrypt.hashSync(req.body.password, 10),
      isMember: false,
      isAdmin: false,
    })

    if (req.body.member_password === process.env.MEMBER) {
      user.isMember = true
    }

    if (req.body.admin_password === process.env.ADMIN) {
      user.isAdmin = true
    }

    user.save(err => {
      if (err) {
        res.json(null)
      } else {
        res.json(user)
      }
    })
  })

  app.post("/api/messages/:id/delete", (req, res, next) => {
    db.Message.findByIdAndDelete(req.params.id)
      // .lean({ virtuals: true })
      .exec((err, results) => {
        if (err) {
          return next(err)
        }
        res.json(results)
        // res.redirect("/messages");
      })
  })

  app.put("/upgrade", (req, res, next) => {
    if (
      req.body.isMember === true &&
      req.body.admin_password === process.env.ADMIN
    ) {
      db.User.findOneAndUpdate(
        { _id: mongoose.mongo.ObjectId(req.body._id) },
        { isAdmin: true },
        { new: true }
      )
        .then(response => {
          res.json(response)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (
      req.body.isMember === false &&
      //   req.body.member_password === process.env.MEMBER &&
      req.body.admin_password === process.env.ADMIN
    ) {
      db.User.findOneAndUpdate(
        { _id: mongoose.mongo.ObjectId(req.body._id) },
        { isMember: true, isAdmin: true },
        { new: true }
      )
        .then(response => {
          res.json(response)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (
      req.body.isMember === false &&
      req.body.member_password === process.env.MEMBER
    ) {
      db.User.findOneAndUpdate(
        { _id: mongoose.mongo.ObjectId(req.body._id) },
        { isMember: true },
        { new: true }
      )
        .then(response => {
          res.json(response)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      res.json(null)
    }
  })
}
