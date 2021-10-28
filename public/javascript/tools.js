function getTotalAmount(records) {
  let totalAmount = 0;
  records.forEach((e) => {
    totalAmount += e.amount;
  });
  return totalAmount;
}

module.exports = { getTotalAmount };
