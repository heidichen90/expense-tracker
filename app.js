const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const handlebarsHelpers = require('handlebars-helpers')
const helpers = handlebarsHelpers()
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const flash = require('connect-flash')
require('./config/mongoose')

const PORT = process.env.PORT || 3000

const usePassport = require('./config/passport')

// set handlebars as a view engine
app.engine(
  'hbs',
  exhbs({ defaultLayout: 'main', extname: '.hbs', helpers: helpers })
)
app.set('view engine', 'hbs')

// set express session
app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  })
)

// set bodyparser
app.use(express.urlencoded({ extended: true }))

// set method-override
app.use(methodOverride('_method'))

// setting static files
app.use(express.static('public'))

// set up passport
usePassport(app)

// set up flash
app.use(flash())

// middleware to pass in flash message
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})

// set router
app.use(routes)

// activate and set port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
