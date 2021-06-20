function getCategoryClass(category) {
  const categoryToClass = new Object();
  category.forEach((e) => (categoryToClass[e.name] = e.icon_class));
  return categoryToClass;
}

function getTotalAmount(records) {
  let totalAmount = 0;
  records.forEach((e) => {
    totalAmount += e.amount;
  });
  return totalAmount;
}

module.exports = { getCategoryClass, getTotalAmount };
