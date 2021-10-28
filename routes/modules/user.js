const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []

  // check register form field
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Missing required field.' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: "Password didn't match Confirm Password." })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then((user) => {
      console.log('user', user)
      if (user) {
        errors.push({ message: 'This email is registered' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => User.create({ name, email, password: hash }))
          .then(() => {
            res.redirect('/')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    .catch((err) => console.log(err))
})

module.exports = router
