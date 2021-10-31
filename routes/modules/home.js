const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const {
  getTotalAmount,
  capitalizeFirstLetter
} = require('../../public/javascript/tools')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const records = await Record.find({ userId })
      .populate('categoryId')
      .lean()
      .sort({ _id: 'asc' })
    const categoryList = await Category.find().lean().sort({ _id: 'asc' })

    records.forEach((e) => {
      e.iconClass = e.categoryId.icon_class
    })

    const totalAmount = getTotalAmount(records)

    res.render('index', {
      records,
      category: capitalizeFirstLetter(categoryList),
      totalAmount
    })
  } catch (error) {
    console.log(error)
    res.render('error', { error })
  }
})

// filter a category
router.get('/filter/:category', async (req, res) => {
  const userId = req.user._id
  try {
    const categoryParam = req.params.category.toLowerCase()
    const records = await Record.find({ category: categoryParam, userId })
      .populate('categoryId')
      .lean()
    const categoryList = await Category.find().lean().sort({ _id: 'asc' })

    records.forEach((e) => {
      e.iconClass = e.categoryId.icon_class
    })

    const totalAmount = getTotalAmount(records)

    res.render('index', {
      records,
      category: capitalizeFirstLetter(categoryList),
      totalAmount,
      selectedCategory: req.params.category
    })
  } catch (error) {
    console.log(error)
    res.render('error', { error })
  }
})

module.exports = router
