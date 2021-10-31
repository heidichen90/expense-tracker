const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const mockExpenseData = require('../../mock_data/expense.json')

db.once('open', () => {
  Promise.all(
    mockExpenseData.expenseSeeds.map(async (expenseRecord, index) => {
      // get the categoryId
      const categoryObj = await Category.findOne({
        name: expenseRecord.category
      })
      let userObj = {}
      if (index < 3) {
        userObj = await User.findOne({ name: 'User1' })
      } else {
        userObj = await User.findOne({ name: 'User2' })
      }

      const record = new Record({
        ...expenseRecord,
        categoryId: categoryObj._id,
        userId: userObj._id
      })

      console.log(record)

      const newRecord = await Record.create(record)

      return newRecord
    })
  ).then(() => {
    console.log('record seeder done!')
    process.exit()
  })
})
