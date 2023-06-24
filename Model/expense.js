const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const catagory = sequelize.define("expense", {
  exId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  exDes: {
    type: Sequelize.STRING(20),

    allowNull: false,
  },
  exAmount: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
  },
  exDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = catagory;
