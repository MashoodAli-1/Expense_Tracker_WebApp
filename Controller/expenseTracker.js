const express = require("express");
const sequelize = require("../Db/connect");

const user = require("../Model/user");
const catagory = require("../Model/catagory");
const expense = require("../Model/expense");
const data = require("../Model/data");

// defining associations
user.hasMany(expense);
catagory.hasMany(expense);
const getSignInPage = async (req, res, next) => {
  res.render("signIn", { data: "hello get request" });
};

const test = async (req, res, next) => {
  const getUser = await user.findAll();
  res.json({ data: getUser });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const role = "user";
  try {
    await user.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    console.log("User created");
    // console.log(`${req.body.name} ${req.body.password}`);
    res.render("signIn", { data: "sign-up successfully" });
    // res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("signIn", { data: "email already exist" });
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("error");
  console.log(email);
  const getUser = await user.findOne({ where: { email: email } });
  console.log(getUser);
  if (getUser == null) {
    res.render("signIn", { data: "user not found" });
  } else if (email === getUser.email && password === getUser.password) {
    console.log("matched");
    await data.create({ dId: getUser.id });
    getHome(req, res, next);
    // res.render("home", { data: "user login" });
  } else {
    res.render("signIn", { data: "Wrong Password" });
  }
};

// home controller
const getHome = async (req, res, next) => {
  const getExpense = await expense.findAll();
  const getCatagory = await catagory.findAll();
  const dataa = await data.findAll();
  var income = 0,
    expense1 = 0;
  const catagory1 = [];
  const expenseData = [];
  const incomeData = [];
  for (let i = 0; i < getExpense.length; i++) {
    for (let j = 0; j < getCatagory.length; j++) {
      if (
        getExpense[i].catagoryCtgId === getCatagory[j].ctgId &&
        getExpense[i].userId === dataa[0].dId
      ) {
        if (getCatagory[j].ctgType === "Expense") {
          catagory1.push(getCatagory[j].ctgName);
          expenseData.push(getExpense[i].exAmount);
          expense1 = expense1 + getExpense[i].exAmount;
        } else if (getCatagory[j].ctgType === "Income") {
          incomeData.push(getExpense[i].exAmount);
          income = income + getExpense[i].exAmount;
        }
      }
    }
  }
  console.log(catagory1, expenseData, incomeData);

  res.render("home", {
    Income: income,
    Expense: expense1,
    catagories: catagory1,
    expenseData: expenseData,
    incomeData: incomeData,
  });
};

const getCatagory = async (req, res, next) => {
  const allCatagory = await catagory.findAll();
  res.render("Catagory", { Data: allCatagory, action: "show" });
};

const addCatagory = async (req, res, next) => {
  res.render("Catagory", { action: "add" });
};

const insertCatagory = async (req, res, next) => {
  var { catname, cattype } = req.body;
  console.log(catname, cattype);
  // if (cattype === 1) {
  //   cattype = "Expense";
  // } else {
  //   cattype = "Income";
  // }
  try {
    await catagory.create({ ctgName: catname, ctgType: cattype });
    const allCatagory = await catagory.findAll();
    res.render("Catagory", { Data: allCatagory, action: "show" });
  } catch (error) {
    console.log(error);
  }
};

const getEditPage = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  const editCatagory = await catagory.findOne({ where: { ctgId: id } });
  res.render("Catagory", { Data: editCatagory, action: "edit" });
};

const editPage = async (req, res, next) => {
  const { id } = req.params;
  const { catname, cattype } = req.body;
  console.log(id, catname, cattype, req.body, req.params);
  await catagory.update(
    { ctgName: catname, ctgType: cattype },
    { where: { ctgId: id } }
  );
  const allCatagory = await catagory.findAll();
  res.render("Catagory", { Data: allCatagory, action: "show" });
};

const deleteCatagory = async (req, res, next) => {
  const { id } = req.params;
  await catagory.destroy({ where: { ctgId: id } });
  const allCatagory = await catagory.findAll();
  res.render("Catagory", { Data: allCatagory, action: "show" });
};

/* Transection controllers */
const getTransection = async (req, res, next) => {
  const catagories = [];
  const valideExpense = [];
  const getExpense = await expense.findAll();
  const getCatagory = await catagory.findAll();
  const dataa = await data.findAll();
  console.log(getExpense, getCatagory);

  for (let i = 0; i < getExpense.length; i++) {
    for (let j = 0; j < getCatagory.length; j++) {
      if (
        getExpense[i].catagoryCtgId === getCatagory[j].ctgId &&
        getExpense[i].userId === dataa[0].dId
      ) {
        valideExpense.push(getExpense[i]);
        catagories.push(getCatagory[j].ctgName);
      }
    }
  }

  console.log("length = ", catagories[0]);
  res.render("Transection", {
    action: "show",
    Data: valideExpense,
    catagory: catagories,
  });
};

const addTransaction = async (req, res, next) => {
  const allCatagory = await catagory.findAll({ attributes: ["ctgName"] });
  console.log(allCatagory[0].ctgName);
  res.render("Transection", { action: "add", Data: allCatagory });
};

const insertTransaction = async (req, res, next) => {
  const { exdate, catname, examount, exdes } = req.body;
  console.log(exdate, catname, examount, exdes);
  const getCatagory = await catagory.findOne({ where: { ctgName: catname } });
  const u_Id = await data.findAll();
  console.log(getCatagory, u_Id[0].dId);
  await expense.create({
    exDes: exdes,
    exAmount: examount,
    exDate: exdate,
    userId: u_Id[0].dId,
    catagoryCtgId: getCatagory.ctgId,
  });
  getTransection(req, res, next);
};

/* logout */
const logOut = async (req, res, next) => {
  await data.destroy({ where: {} });
  res.render("signIn", { data: "Logout successfully!" });
};

const editTransaction = async (req, res, next) => {
  res.render("Transection", { action: "edit" });
};

const editedTransaction = async (req, res, next) => {
  res.render("Transection", { action: "edit" });
};

const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  console.log("entered");
  await expense.destroy({ where: { exId: id } });
  getTransection(req, res, next);
};

// Api for Chart
// const chartData = async(req,res,next)=>{

// }

module.exports = {
  getSignInPage,
  signUp,
  signIn,
  getCatagory,
  getHome,
  addCatagory,
  insertCatagory,
  getEditPage,
  editPage,
  deleteCatagory,
  getTransection,
  addTransaction,
  insertTransaction,
  editTransaction,
  editedTransaction,
  deleteTransaction,
  logOut,
  test,
};
