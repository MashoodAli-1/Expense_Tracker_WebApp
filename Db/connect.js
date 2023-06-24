const Sequelize = require("sequelize");

const sequelize = new Sequelize("Expense_Tracker", "root", "boom boom", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
