const express = require("express");
const userRoute = require("./routes/user");
const sequelize = require("./Db/connect");
const path = require("path");
const app = express();

app.set("view engine", "ejs"); // set the view engine to ejs

// body parser
// app.use(bodyParser.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
// app.use(bodyParser.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
// app.use(express.static("./public"));

app.use("/", userRoute);
// app.use("/api", userRoute);

const port = 3000;
// const Email = "mashood123@gmail.com";
// const Password = "boom boom";
// starting point
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to db...");
    await sequelize.sync({ force: false });
    // raw query
    // await sequelize.query(
    //   `INSERT INTO Expense_Tracker.signups (id,email,password,createdAt,updatedAt) VALUES (default,'${Email}','${Password}','2022-11-19 16:03:15','2022-11-19 16:03:15');`
    // );

    // await signUp.create({ email: Email, password: Password });

    app.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
