const express = require("express");
const {
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
} = require("../Controller/expenseTracker");
// express router
const router = express.Router();

/* Sign in routes */
router.route("/").get(getSignInPage);
router.route("/api/addUser").post(signUp);
router.route("/api/sign-in").post(signIn);
router.route("/Home").get(getHome);
/* Catagories Routes */
router.route("/Catagory").get(getCatagory);
router.route("/addCatagory").get(addCatagory);
router.route("/addCatagory").post(insertCatagory);
router.route("/edit/:id").get(getEditPage);
router.route("/edit/:id").post(editPage);
router.route("/delete/:id").get(deleteCatagory);

/* Transections Route */
router.route("/Transection").get(getTransection);
router.route("/addTransaction").get(addTransaction);
router.route("/addTransaction").post(insertTransaction);
router.route("/editTransaction/:id").get(editTransaction);
router.route("/editTransaction/:id").post(editedTransaction);
router.route("/deleteTransaction/:id").get(deleteTransaction);
/* logout */
router.route("/logout").get(logOut);

/* test */
router.route("/test").get(test);

module.exports = router;
