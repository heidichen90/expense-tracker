const db = require('../../config/mongoose')
const User = require('../user')
const mockData = require('../../mock_data/user.json')
const bcrypt = require('bcryptjs')

db.once('open', () => {
  Promise.all(
    mockData.userSeeds.map((seedUser) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(seedUser.password, salt))
        .then((hash) => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
        })
    })
  )
    .then(() => {
      console.log('user seeder done!')
      process.exit()
    })
    .catch((error) => {
      console.log(error)
    })
})
